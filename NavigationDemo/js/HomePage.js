/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    DeviceEventEmitter
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'


export default class HomePage extends Component {
    static navigationOptions = {
        title:"Home",
    }

    // componentDidMount() {
    //     this.listener = DeviceEventEmitter.addListener('showToast',(text)=>{
    //         this.toast.show(text,DURATION.LENGTH_SHORT);
    //     })
    // }
    //
    // componentWillUnmount() {
    //     this.listener&& this.listener.remove();
    // }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text> 欢迎来到HomePage</Text>
                <Button
                    title="Go To Page1"
                    onPress={() =>{
                        navigation.navigate('Page1',{name:'zhungesds动态的标题'})
                    }}
                />
                <Button
                    title="Go To TrendingTest"
                    onPress={() =>{
                        navigation.navigate('TrendingTest')
                    }}
                />
                <Button
                    title="Go To Page3"
                    onPress={() =>{
                        navigation.navigate('Page3',{title:'Devio3'})

                    }}
                />
                <Button
                    title="Go To TabNavigator"
                    onPress={() =>{
                        navigation.replace('TabNav')
                    }}
                />
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
});
