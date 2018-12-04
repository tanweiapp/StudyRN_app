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
    WebView,
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
const URL='http://www.imooc.com';
export default class WebViewTest extends Component {

    constructor(props){
        super(props);
        this.state={
            url:URL,
            title:'',
            canGoBack:false,
        }
    }
    goBack(){
        if(this.state.canGoBack){
            this.webView.goBack();
        }else {
            this.toast.show('到顶了！')
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
            title:e.title,
        })
    }
    render(){
        return<View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.tips}
                      onPress={()=>{
                       this.goBack();
                  }}>返回</Text>
                <TextInput style={styles.input}
                           defaultValue={URL}
                           onChangeText={text=>this.text=text}
                />
                <Text style={styles.tips}
                      onPress={()=>{
                       this.go();
                  }}>GO</Text>
            </View>
            <WebView ref={webView=>this.webView=webView}
                     source={{uri:this.state.url}}
                     onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
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