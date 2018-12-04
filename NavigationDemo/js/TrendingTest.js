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
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import DataRepository,{FLAG_STORAGE} from './expand/dao/DataRepository'
import GitHubTrending from 'GitHubTrending'
const  KEY = 'test';
const URL = 'https://github.com/trending/';
export default class TrendingPage extends Component {

    static navigationOptions = {
        title:"TrendingTest",
    }
    constructor(props){
        super(props);
        this.dataRepository=new DataRepository(FLAG_STORAGE.flag_trending);
        this.trending = new GitHubTrending();
        this.state={
            result:'',
        }
    }
    onLoad(){
        let  url = URL + this.text;
        console.log('URL=====>' +url);
        this.dataRepository.fetchRepository(url)
            .then(result=>{
                console.log(JSON.stringify(result));
                this.setState=({
                    result:JSON.stringify(result),
                })
            })

            .catch(error=>{
                this.setState=({
                    result:error,
                })
            })
    }

    render(){
        return<View style={styles.container}>
            <TextInput
                style={{borderWidth:1,height:40,width:200,margin:15}}
                onChangeText={text=>this.text=text}
            />
            <View style={{flexDirection:'row',}}>
                <Text style={styles.tips}
                      onPress={()=>this.onLoad()}
                >加载数据</Text>
                <Text style={styles.text}>{this.state.result}</Text>
            </View>
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
    text:{
        flex:1,
    },
})