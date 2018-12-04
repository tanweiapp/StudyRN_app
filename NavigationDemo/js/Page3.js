/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';

export default class Page3 extends Component {
    render() {
        const  {navigation} = this.props;
        const {state,setParams} = navigation;
        const {params} = state;
        const showText = params.mode === 'edit' ? '正在编辑' : '编辑完成';
        return (
            <View style={styles.container}>
                <Text> 这里是Page333 页面哦！</Text>
                <Button
                    title="Go Back"
                    onPress={()=>{
                        navigation.goBack();
                    }}
                />
                <Text> {showText}</Text>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={text => {
                        setParams({title: text})
                    }}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    inputStyle:{
        height:50,
        borderWidth:1,
        marginTop:20,
        borderColor:'black',
        width:300,
    }
});
