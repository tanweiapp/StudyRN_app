import React, {Component} from 'react';
import {Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    ListView,
    AsyncStorage,
    Alert,
    TouchableHighlight,
    TouchableOpacity,
    Image,
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import SortableListView from 'react-native-sortable-listview'
import LanguageDao,{FLAG_LANGUAGE} from'./expand/dao/LanguageDao'
import ArrayUtil from './util/ArrayUtil'
const  KEY = 'test';
export default class SortKeyPage extends Component {
    componentDidMount() {
        this.loadData();
        title = this.flag===FLAG_LANGUAGE.flag_language?'自定义语言排序':'自定义语言排序';
        this.props.navigation.setParams({
            title:title,
            leftClick:this._leftClick,
            rightClick:this._rightClick
        });
    }
    static navigationOptions = ({navigation,screenProps}) => ({
        headerTitle:navigation.state.params.title ? navigation.state.params.title : 'defult page3',
        headerLeft:(
            <TouchableOpacity
                onPress={navigation.state.params?navigation.state.params.leftClick:null}
            >
                <Image
                    style={{width:26,height:26,marginLeft:10}}
                    source={require('../res/images/ic_arrow_back_white_36pt.png')}
                />
            </TouchableOpacity>
        ),
        headerRight:(
            <TouchableOpacity
                onPress={navigation.state.params?navigation.state.params.leftClick:null}
            >
                <Text style={styles.right}
                      onPress={navigation.state.params?navigation.state.params.rightClick:null}
                >保存</Text>
            </TouchableOpacity>
        ),
    });

    constructor(props){
        super(props);
        this.flag = this.props.navigation.state.params.flag ? this.props.navigation.state.params.flag : '';
        this.languageDao = new LanguageDao(this.flag);
        this.dataArray = [];
        this.sortResultArray = [];
        this.originalCheckedArray = [];
        this.state = {
            checkedArray: [],
        }
    }

    loadData(){
        this.languageDao.fetch()
            .then(result=>{
                this.getCheckedItems(result);
            })
            .catch(error=>{

            });
    }

    getCheckedItems(result){
        this.dataArray = result;
        let  checked_Array=[];
        for(let i=0,len=result.length;i<len;i++){
            let  data = result[i];
            if(data.checked)checked_Array.push(data);
        }
        this.setState({
            checkedArray:checked_Array
        });
        this.originalCheckedArray = ArrayUtil.clone(checked_Array);
        console.log(checked_Array);
    }

    _leftClick=()=>{
        if(ArrayUtil.isEqual(this.originalCheckedArray,this.state.checkedArray)){
            this.props.navigation.pop();
        }else{
            Alert.alert(
                '提示',
                '需要保存修改吗',
                [
                    {text: '不保存', onPress: () => {this.props.navigation.goBack();}},

                    {text: '保存', onPress: () => {this._rightClick(true)}},
                ],
                { cancelable: false }
            )
        }
    }
    _rightClick=(isChecked)=>{
        if(!isChecked&&ArrayUtil.isEqual(this.originalCheckedArray,this.state.checkedArray)){
            this.props.navigation.pop();
        }else{
            this.getSortResult();
            this.languageDao.save(this.sortResultArray);
            this.props.navigation.pop();
        }
    }
    getSortResult() {
        this.sortResultArray = ArrayUtil.clone(this.dataArray);
        let res= this.state.checkedArray;
        let org= this.originalCheckedArray;
        let sort  = ArrayUtil.clone(this.dataArray);
        org.map((item,sindex)=>{
             let indexp= null
            this.sortResultArray.filter((child,index)=>{
                 if(child.name==item.name){
                     indexp=index
                 }
            })
             sort[indexp]=res[sindex];

            //  sort.splice(indexp,1,res[sindex])
        })
       this.sortResultArray= sort;

        // for(let i=0,l=this.originalCheckedArray.length;i<l;i++){
        //     let item = this.originalCheckedArray[i];
        //     let index = this.dataArray.indexOf(item);
        //     this.sortResultArray.splice(index,1,this.state.checkedArray);
        // }
    }

    render(){
        return<View style={styles.container}>
            <SortableListView
                style={{flex:1}}
                data={this.state.checkedArray}
                order={Object.keys(this.state.checkedArray)}
                onRowMoved={e=>{
                    this.state.checkedArray.splice(e.to,0,this.state.checkedArray.splice(e.from,1)[0]);
                    this.forceUpdate();
                }}
                renderRow={row=><SortCell data={row} />}
            />
        </View>
    }
}

class  SortCell extends Component{
    render(){
        return (
            <TouchableHighlight
                underlayColor={'#eee'}
                style={styles.item}
                {...this.props.sortHandlers}
            >
                <View style={styles.row}>
                    <Image style={styles.image}
                           source={require('../res/images/ic_sort.png')}/>
                    <Text>{this.props.data.name}</Text>
                </View>

            </TouchableHighlight>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,

    },
    tips:{
        fontSize:28,
        margin:10,
    },
    item:{
        padding: 15,
        backgroundColor: '#F8F8F8',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
    },
    image:{
        tintColor:'#2196F3',
        height:16,
        width:16,
        marginRight:10,
    },
    right:{
        marginRight:15,
        color:'white',
    },
})