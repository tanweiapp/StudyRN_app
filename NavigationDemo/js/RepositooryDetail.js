import React, {Component} from 'react';
import {Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    ListView,
    AsyncStorage,
    TouchableOpacity,
    Image,
    Alert,
    WebView,
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
const URL='http://www.imooc.com';
const TRENDING_URL = 'https://github.com/';
export default class WebViewTest extends Component {
    componentDidMount(){
        this.props.navigation.setParams({
            leftClick:this._leftClick,
            rightClick:this._rightClick
        })
    }
    static navigationOptions = ({navigation,screenProps}) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
        headerTitle:navigation.state.params.projectModel.item.full_name ? navigation.state.params.projectModel.item.full_name : navigation.state.params.projectModel.item.fullName,
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
        // headerRight:(
        //     <TouchableOpacity
        //         onPress={navigation.state.params?navigation.state.params.rightClick:null}
        //     >
        //         <Text style={styles.right}
        //               onPress={navigation.state.params?navigation.state.params.rightClick:null}
        //         >哈哈</Text>
        //     </TouchableOpacity>
        // ),
    });
    constructor(props){
        super(props);
        this.url = this.props.navigation.state.params.projectModel.item.html_url ? this.props.navigation.state.params.projectModel.item.html_url : TRENDING_URL+this.props.navigation.state.params.item.fullName;
        let title = this.props.navigation.state.params.projectModel.item.full_name ? this.props.navigation.state.params.projectModel.item.full_name : this.props.navigation.state.params.projectModel.item.fullName;
            this.state={
            url: this.url,
            title:title,
            canGoBack:false,
        }
    }
    _leftClick=()=>{

        if(this.state.canGoBack){
            this.webView.goBack();
        }else {
            this.props.navigation.goBack();
        }
    }
    go(){
        this.setState({
            url:this.text,
        })
    }
    onNavigationStateChange(e){
        this.setState({
            canGoBack:e.canGoBack,
        })
    }
    render(){
        return<View style={styles.container}>
            <WebView ref={webView=>this.webView=webView}
                     source={{uri:this.state.url}}
                     onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
                     startInLoadingState={true}
            />
            <Toast ref={toast=>this.toast=toast}
                   style={{backgroundColor:'red'}}
                   position='top'
                   positionValue={200}
                   fadeInDuration={750}
                   fadeOutDuration={1000}
                   opacity={0.8}
            />
        </View>
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
        margin:10,
    },
    tips:{
        fontSize:16,
    },
    input:{
        height:40,
        flex:1,
        borderWidth:1,
        margin:2
    },

})