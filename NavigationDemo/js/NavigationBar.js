/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image, StatusBar} from 'react-native';
import PropTypes from 'prop-types';

const  NAV_BAR_HEIGHT_ANDROID = 50;
const  NAV_BAR_HEIGHT_IOS = 44;
const  STATUS_BAR_HEIGHT = 20;
const StatusBarShape = {//约束statusBar的样式
    backgroundColor:PropTypes.string,
    barStyle:PropTypes.oneOf(['default','light-content','dark-content']),
    hidden:PropTypes.bool,
}

export default class NavigationBar extends Component {
    static  propTypes = {
        style:PropTypes.style,
        title:PropTypes.string,
        titleView:PropTypes.element,
        hide:PropTypes.bool,
        leftButton:PropTypes.element,
        rightButton:PropTypes.element,
        statusBar:PropTypes.shape(StatusBarShape),//约束导航栏中的statusBar的样式

    }
    static defaultProps = {
        statusBar: {
        barStyle:'light-content',
        hidde:false,
      }
    }
    constructor(props){
        super(props);
        this.state={
            title:'',
            hidde:false,
        }
    }
    render() {//设置用户设置的样式 this.props.statusBar
        let statusBar = <View style={[styles.statusBarStyle,this.props.statusBar]}>
            <StatusBar {...this.props.statusBar}/>
        </View>
        let  titleView = this.props.titleView ? this.props.titleView : <Text style={styles.title}>{this.props.title}</Text>
        let content = <View style={styles.navBarStyle}>
            {this.props.leftButton}
            <View style={styles.titelViewContainer}>
                {titleView}
            </View>

            {this.props.rightButton}
        </View>
        return (
            <View style={[styles.container,this.props.style]}>
                {statusBar}
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray',
    },
    navBarStyle:{
        justifyContent:'space-between',
        alignItems:'center',
        height:Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
        backgroundColor:'#2196F3',
        flexDirection:'row',
    },
    titelViewContainer:{
      justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        right:40,
        left:40,
        top:0,
        bottom:0,
    },
    title:{
        color:'white',
        fontSize:16,
    },
    statusBarStyle:{
        height:Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
    },
});
