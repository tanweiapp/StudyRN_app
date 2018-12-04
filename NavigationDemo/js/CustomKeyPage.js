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
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import LanguageDao,{FLAG_LANGUAGE} from './expand/dao/LanguageDao'
import CheckBox from 'react-native-check-box'
import ArrayUtils from './util/ArrayUtil'
const  KEY = 'test';
export default class CustomKeyPage extends Component {
    属性给params
    componentDidMount(){
        this.loadData();//
        this.props.navigation.setParams({
            title:this.isRemoveKey?'标签移除':'自定义标签',
            rightTitle:this.isRemoveKey?'移除':'保存',
            leftClick:this._leftClick,
            rightClick:this._rightClick
        })
    }
    static navigationOptions = ({navigation,screenProps}) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
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
                >{navigation.state.params.rightTitle ? navigation.state.params.rightTitle : 'defult page3'}</Text>
            </TouchableOpacity>
        ),
    });
    constructor(props){
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.changeValues = [];
        this.isRemoveKey = this.props.navigation.state.params.isRemoveKey?true:false
        this.state={
            dataArray:[],
            isChecked:false,
        }
    }

    loadData(){
        this.languageDao.fetch()
            .then(result=>{
                this.setState({
                    dataArray:result
                })
                    .catch(error=>{
                        console.log(error);
                    })
            })
    }

    _leftClick = () =>{
        if (this.changeValues.length===0){
            this.props.navigation.goBack();
        }else{
            Alert.alert(
                '提示',
                '需要保存修改吗',
                [
                    {text: '不保存', onPress: () => {this.props.navigation.goBack();}},

                    {text: '保存', onPress: () => {this.onSave()}},
                ],
                { cancelable: false }
            )
        }

    }
    onSave(){
        if(this.changeValues.length===0){
            this.props.navigation.goBack();
        }
        for(let i=0,len=this.changeValues.length;i<len;i++){
            ArrayUtils.remove(this.state.dataArray,this.changeValues[i]);
        }
        this.languageDao.save(this.state.dataArray);
        this.props.navigation.goBack();

    }
    _rightClick = () =>{
       this.onSave();
        // this.props.navigation.goBack();
    }
    renderView(){
        if (!this.state.dataArray || this.state.dataArray.length === 0 ) return null;
        let  len = this.state.dataArray.length;
        let  views = [];
        for(let i=0,l=len-2;i<l;i+=2){
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i+1]) }
                    </View>
                    <View style={styles.line}></View>
                </View>
            )
        }
        views.push(
            <View key={len-1}>
                <View style={styles.item}>
                    {len%2===0?this.renderCheckBox(this.state.dataArray[len-2]):null}
                    {this.renderCheckBox(this.state.dataArray[len-1])}
                </View>
                <View style={styles.line}></View>
            </View>
        )
        return views;
    }
    renderCheckBox(data){
        let leftText = data.name;
        let  isChecked = this.isRemoveKey?false:data.checked
        return(
        <CheckBox style={{flex:1,padding:10}}
                  onClick={()=>this.onCLick(data)}
                  leftText={leftText}
                  isChecked={isChecked}
                  checkedImage={<Image
                      style={{tintColor:'#6495ED'}}
                      source={require('../res/images/ic_check_box.png')}//ic_check_box
                      />}
                  unCheckedImage={<Image
                      style={{tintColor:'#6495ED'}}
                      source={require('../res/images/ic_check_box_outline_blank.png')}
                      />}
        />

        )
    }
    onCLick(data){
       if(!this.isRemoveKey) {
           data.checked = !data.checked;
           this.setState({
               isChecked: !data.checked
           })

       }
        ArrayUtils.updateArray(this.changeValues,data);
    }
    render(){
        return<View style={styles.container}>
            <ScrollView>
                {this.renderView()}
            </ScrollView>

        </View>
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,

    },
    tips:{
        fontSize:18,
        margin:10,
    },
    right:{
        fontSize:12,
        marginRight:10,
        color:'white',
    },
    line:{
        height:0.3,
        backgroundColor:'darkgray',

    },
    item:{
      flexDirection:'row',
    },
})