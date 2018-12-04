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
const  KEY = 'test';
export default class MyPage extends Component {
    static navigationOptions = {
        title:"我的",
    }

    render(){
        return<View style={styles.container}>
            <Text style={styles.tips}
                  onPress={()=>{
                      this.props.navigation.navigate('CustomKeyPage',{
                          isRemoveKey:false,
                      });
                  }}
            >进入自定义标签页</Text>

            <Text style={styles.tips}
                  onPress={()=>{
                      this.props.navigation.navigate('SortKeyPage');
                  }}
            >进入SortListView自定义标签排序页</Text>

            <Text style={styles.tips}
                  onPress={()=>{
                      this.props.navigation.navigate('CustomKeyPage',{
                          isRemoveKey:true,
                      });
                  }}
            >进入标签移除页</Text>
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