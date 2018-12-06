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
import LanguageDao,{FLAG_LANGUAGE} from './expand/dao/LanguageDao'
import  NavigationBar from './NavigationBar'
const  KEY = 'test';
export default class MyPage extends Component {
    static navigationOptions = {
        title:"我的",
    }

    render(){
        return<View style={styles.container}>
            <NavigationBar
                title={'我的'}
                statusBar={{backgroundColor:'#2196F3'}}

            />
            <Text style={styles.tips}
                  onPress={()=>{
                      this.props.navigation.navigate('CustomKeyPage',{
                          isRemoveKey:false,
                          flag:FLAG_LANGUAGE.flag_key
                      });
                  }}
            >进入自定义标签页</Text>

            <Text style={styles.tips}
                  onPress={()=>{
                      this.props.navigation.navigate('SortKeyPage',{
                          flag:FLAG_LANGUAGE.flag_key,
                      });
                  }}
            >进入SortListView自定义标签排序页</Text>

            <Text style={styles.tips}
                  onPress={()=>{
                      this.props.navigation.navigate('CustomKeyPage',{
                          isRemoveKey:true,
                          flag:FLAG_LANGUAGE.flag_language,
                      });
                  }}
            >进入标签移除页</Text>

            <Text style={styles.tips}
                  onPress={()=>{
                      this.props.navigation.navigate('CustomKeyPage',{
                          flag:FLAG_LANGUAGE.flag_language,
                      });
                  }}
            >进入自定义语言页</Text>

            <Text style={styles.tips}
                  onPress={()=>{
                      this.props.navigation.navigate('SortKeyPage',{
                          flag:FLAG_LANGUAGE.flag_language,
                      });
                  }}
            >进入SortListView自定义语言排序页</Text>

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
})