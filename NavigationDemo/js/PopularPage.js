/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    ListView,
    RefreshControl,
    DeviceEventEmitter,
} from 'react-native';
import NavigationBar from './NavigationBar';
import ProjectModel from './model/ProjectModel'
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import Toast, {DURATION} from 'react-native-easy-toast'
import DataRepository,{FLAG_STORAGE} from './expand/dao/DataRepository'
import RepositoryItemCell from './common/RepositoryItemCell'
import FavoriteDao from './expand/dao/FavoriteDao'
import Utils from './util/Utils'
import LanguageDao,{FLAG_LANGUAGE} from './expand/dao/LanguageDao'
const  URL = 'https://api.github.com/search/repositories?q=';
const  QUERY_STR = '&sort=stars';
var favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
export default class PopularPage extends Component {

    constructor(props){
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        // this.languageDao.remove();
        this.dataRepository = new DataRepository(FLAG_STORAGE.flag_popular);
        this.state={
            languages:[]
        }
    }

    componentDidMount() {
        this.loadData();
        this.listener = DeviceEventEmitter.addListener('showToast',(text)=>{
            this.toast.show(text,DURATION.LENGTH_SHORT);
        })
    }
    componentWillUnmount() {
        this.listener&& this.listener.remove();
    }
    loadData(){
        this.languageDao.fetch()
            .then(result=>{
                this.setState({
                    languages:result
                })
                    .catch(error=>{
                        console.log(error);
                    })
            })
    }

    onLoad(){
        let  url = this.genUrl(this.text);
        this.dataRepository
            .fetchNetRepository(url)
            .then(result=>{
                this.setState({
                    result:JSON.stringify(result)
                })
            })
            .catch(error=>{
                this.setState({
                    result:JSON.stringify(error)
                })
            })
    }
    genUrl(key){
        return URL + key + QUERY_STR;
    }
    render() {
        const {navigation} = this.props;
        let content = this.state.languages.length>0?<ScrollableTabView
                tabBarBackgroundColor="#2196F3"
                tabBarInactiveTextColor="mintcream"
                tabBarActiveTextColor="white"
                tabBarUnderlineStyle={{backgroundColor:"#e7e7e7",height:2}}
                renderTabBar={()=><ScrollableTabBar />}
            >
                {this.state.languages.map((result,i,arr)=>{
                    let  lan=arr[i];
                    return lan.checked?<PopularTab key={i} tabLabel={lan.name} navigation={this.props.navigation}> JAVA</PopularTab>:null
                })}

            </ScrollableTabView>:null;
        return (
            <View style={{flex: 1}}>
                <NavigationBar
                    title={'最热标签'}

                    statusBar={{backgroundColor:'#2196F3'}}

                />
                {content}
                <Toast ref={toast=>this.toast=toast}
                       style={{backgroundColor:'darkgray'}}
                       position='top'
                       positionValue={200}
                       fadeInDuration={750}
                       fadeOutDuration={1000}
                       opacity={0.8}
                />
            </View>
        );
    }
}

class  PopularTab extends  Component{
    constructor(props){
        super(props);
        this.dataRepository = new DataRepository(FLAG_STORAGE.flag_popular);
        this.state={
            result:'',
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
            isLoading:false,
            favoriteKeys:[]
        }
    }

    componentDidMount() {
        this.loadData()
    }
    onFavorite

    renderRow(projectModel){
        return<RepositoryItemCell
            onSelected={()=>this.onSelected(projectModel)}
            key={projectModel.item.id}
            projectModel = {projectModel}
            onFavorite={(item,isFavorite)=>this.onFavorite(item,isFavorite)}
        />
    }
    genFetchUrl(key){
        return URL + key + QUERY_STR;
    }
    onSelected(projectModel){
        this.props.navigation.navigate('RepositooryDetail',{
            projectModel:projectModel,
        });
    }

    getFavoriteKeys(){
        favoriteDao.getFavoriteKeys()
            .then(keys=>{
                if(keys){
                    // 更新收藏的key
                    this.updateState({favoriteKeys:keys})
                }
                this.flushFavoriteSate();
            })
            .catch(error=>{
                this.flushFavoriteSate();
            })
    }

    /**
     * 更新Project Item Favorite 状态
     *
     * */
    flushFavoriteSate(){
        let  projectModels = [];
       let items = this.items;
       for(var i=0,len=items.length;i<len;i++){
           projectModels.push(new  ProjectModel(items[i],Utils.checkFavorite(items[i],this.state.favoriteKeys)))
       }
       this.updateState({
           isLoading:false,
           dataSource:this.getDataSource(projectModels),
       })
    }

    getDataSource(data){
        return this.state.dataSource.cloneWithRows(data);
    }
    updateState(dic){
        if (!this)return;
        this.setState(dic);
    }

    loadData(){
        this.setState({
        isLoading:true,
    });
        let url = this.genFetchUrl(this.props.tabLabel);//URL + this.props.tabLabel + QUERY_STR;
        this.dataRepository
            .fetchRepository(url)
            .then(result=>{
                this.items = result&&result.items? result.items:result?result:[];
                this.getFavoriteKeys();
                if(result&&result.update_date&&!this.dataRepository.checkDate(result.update_date)){
                    DeviceEventEmitter.emit('showToast','数据过时');
                    return this.dataRepository.fetchNetRepository(url);
                }
            })
            .then(items=>{
                if(!items||items.length===0)return;
                this.items = items;
                this.getFavoriteKeys();

            })
            .catch(error=>{
                this.updateState({
                    result:JSON.stringify(error),
                    isLoading:false,
                })
            })
    }

    render(){
        return<View style={{flex:1}}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(data)=>this.renderRow(data)}
                refreshControl = {
                    <RefreshControl
                    refreshing={this.state.isLoading}
                    onRefresh={()=>this.loadData()}
                    colors={['#2196F3']}
                    tintColor={'#2196F3'}
                    title={'Loading...'}
                    titleColor='#2196F3'
                />}
            />
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        margin: 20,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
