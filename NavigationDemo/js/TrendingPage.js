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
    TouchableOpacity,
    Image,
} from 'react-native';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import  NavigationBar from './NavigationBar'
import Toast, {DURATION} from 'react-native-easy-toast'
import DataRepository,{FLAG_STORAGE} from './expand/dao/DataRepository'
import TrendingCell from './common/TrendingCell';
import TimeSpan from './model/TimeSpan';
import  Popover from  './common/Popover';
import LanguageDao,{FLAG_LANGUAGE} from './expand/dao/LanguageDao'
import ProjectModel from './model/ProjectModel'
import FavoriteDao from './expand/dao/FavoriteDao'
const  API_URL = 'https://github.com/trending/';
import Utils from './util/Utils'
var favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_trending);
var dataRepository = new DataRepository(FLAG_STORAGE.flag_trending);
var  timeSpanTextArray = [
    new TimeSpan('今 天','?since=daily'),
    new TimeSpan('本 周','?since=weekly'),
    new TimeSpan('本 月','?since=monthly'),
];

export default class TrendingPage extends Component {
    componentDidMount() {
        this.loadData();
        this.listener = DeviceEventEmitter.addListener('showToast',(text)=>{
            this.toast.show(text,DURATION.LENGTH_SHORT);
        })
    }
    constructor(props){
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language);
        // this.languageDao.remove();
        // this.dataRepository = new DataRepository(FLAG_STORAGE.flag_trending);
        this.state={
            languages:[],
            timeSpan: timeSpanTextArray[0],
            isVisible:false,
            buttonRect:{},
        }
    }

    renderTitleView(){
        return <View>
            <TouchableOpacity ref = 'button'
                              onPress={()=>this.showPopover()}
            >
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontSize:18,color:'white',fontWeight:'400'}}>趋势 {this.state.timeSpan.showText}</Text>
                    <Image source={require('../res/images/ic_spinner_triangle.png')}
                           style={{width:14,height:14,marginLeft:6}}
                    />
                </View>
            </TouchableOpacity>
        </View>
    }
    showPopover() {
        this.refs.button.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width: width, height: height}
            });
        });
    }

    closePopover(){
        this.setState({
            isVisible:false,
        })
    }

    onSelectTimeSpan(timeSpan){
        this.setState({
            timeSpan:timeSpan,
            isVisible:false,
        })
    }

    componentWillUnmount() {
        this.listener&& this.listener.remove();
    }
    loadData(){
        this.languageDao.fetch()
            .then(result=>{
               if(result) {
                   this.setState({
                       languages: result
                   })
               }
            })
            .catch(error=>{
                console.log(error);
            })
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
                    let  item=arr[i];
                    return item.checked?<TrendingTab key={i} tabLabel={item.name} navigation={this.props.navigation} timeSpan={this.state.timeSpan} /> :null
                })}

            </ScrollableTabView>:null;

        let  timeSpanView =
            <Popover
                isVisible = {this.state.isVisible}
                fromRect = {this.state.buttonRect}
                placement="bottom"
                onClose = {()=>this.closePopover()}
                contentStyle={{backgroundColor:'#343434',opacity:0.82}}
            >
                {timeSpanTextArray.map((result,i,arr)=>{
                    return <TouchableOpacity key={i}
                                             underlayColor='transparent={}'
                                             onPress={()=>this.onSelectTimeSpan(arr[i])}
                    >
                        <View>
                            <Text
                                style={{fontSize:15,color:'white',fontWeight:'400',paddingTop:2,paddingLeft:8,paddingRight:8}}
                            >{arr[i].showText}</Text>
                        </View>

                    </TouchableOpacity>
                })}
            </Popover>
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'趋势' + this.state.timeSpan}
                    titleView={this.renderTitleView()}
                    statusBar={{backgroundColor:'#2196F3'}}

                />
                {content}
                {timeSpanView}
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

class  TrendingTab extends  Component{
    constructor(props){
        super(props);

        this.state={
            result:'',
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
            isLoading:false,
            favoriteKeys:[]
        }
    }

    componentDidMount() {
        this.loadData(this.props.timeSpan,true);
    }

    componentWillReceiveProps(nextProps) { //父组件状态发生变化，子组件进行监听刷新状态
        if(nextProps.timeSpan !== this.props.timeSpan){
            this.loadData(nextProps.timeSpan);
        }
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

    renderRow(projectModel){
        return <TrendingCell
            onSelected={()=>this.onSelected(projectModel)}
            key={projectModel.item.id}
            projectModel = {projectModel}
            onFavorite={(item,isFavorite)=>this.onFavorite(item,isFavorite)}
        />
    }
    getFetchUrl(timeSpan,category){
        return API_URL + category + timeSpan.searchText;//URL + key + QUERY_STR;
    }
    onSelected(projectModel){
        this.props.navigation.navigate('RepositooryDetail',{
            projectModel:projectModel,
        });
    }
    /**
     * cell 点击回调函数
     * */
    onFavorite(item,isFavorite){
        if(isFavorite){
            favoriteDao.saveFavoriteItem(item.fullName.toString(),JSON.stringify(item));
        }else {
            favoriteDao.removeFavoriteItem(item.fullName.toString());
        }
    }

    onRefresh(){
        this.loadData(this.props.timeSpan);
    }

    loadData(timeSpan,isRefresh){
        this.setState({
            isLoading:true,
        });
        let url = this.getFetchUrl(timeSpan.searchText,this.props.tabLabel);//URL + this.props.tabLabel + QUERY_STR;
        dataRepository
            .fetchRepository(url)
            .then(result=>{
                this.items = result&&result.items? result.items:result?result:[];
                this.getFavoriteKeys();

                if(result&&result.update_date&&!dataRepository.checkDate(result.update_date)){
                    DeviceEventEmitter.emit('showToast','数据过时');
                    return dataRepository.fetchNetRepository(url);
                }else {
                    DeviceEventEmitter.emit('showToast','显示缓存数据');
                }
            })
            .then(items=>{
                if(!items||items.length===0)return;
                this.items = items;
                this.getFavoriteKeys();
                DeviceEventEmitter.emit('showToast','显示网络数据');
            })
            .catch(error=>{
                this.updateState({
                    isLoading:false,
                    result:JSON.stringify(error)
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
                    onRefresh={()=>this.onRefresh()}
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
        // alignItems: 'center',
        // backgroundColor: '#F5FCFF',
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
