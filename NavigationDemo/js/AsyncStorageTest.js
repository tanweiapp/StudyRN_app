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
export default class AsyncStorageTest extends Component {
    onSave(){
        AsyncStorage.setItem(KEY,this.text,(error)=>{
            if (!error){
                this.toast.show('保存成功',DURATION.LENGTH_SHORT);
            }else {
                this.toast.show('保存失败',DURATION.LENGTH_LONG);
            }
        })
    }
    onRemove(){
        AsyncStorage.removeItem(KEY,(error)=>{
            if(!error){
                this.toast.show('移除成功');
            }else{
                this.toast.show('移除失败');
            }
        })
    }
    onFetch(){
        AsyncStorage.getItem(KEY,(error,result)=>{
            if(!error){
                if (result !== '' && result!==null){
                    this.toast.show('取出内容：' + result);
                }else {
                    this.toast.show('取出内容不存在');
                }

            }else{
                this.toast.show('取出失败');
            }
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
                      onPress={()=>this.onSave()}
                >保存</Text>
                <Text style={styles.tips}
                      onPress={()=>this.onRemove()}
                >移除</Text>
                <Text style={styles.tips}
                      onPress={()=>this.onFetch()}
                >取出</Text>
            </View>
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

const styles=StyleSheet.create({
    container:{
        flex:1,

    },
    tips:{
      fontSize:18,
        margin:10,
    },
})