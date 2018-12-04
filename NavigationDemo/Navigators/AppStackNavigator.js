
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation';
import HomePage from '../js/HomePage'
import Page1 from '../js/Page1'
import PopularPage from '../js/PopularPage'
import Page2 from  '../js/Page2'
import Page3 from  '../js/Page3'
import MyPage from '../js/MyPage'
import SortKeyPage from '../js/SortKeyPage'
import CustomKeyPage from '../js/CustomKeyPage'
import RepositooryDetail from '../js/RepositooryDetail'
import AsyncStorageTest from '../js/AsyncStorageTest'
import TrendingTest from  '../js/TrendingTest'
import TrendingPage from '../js/TrendingPage'
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button,Image} from 'react-native';
import  Ionicons from  'react-native-vector-icons/Ionicons'

class  TabBarComponent extends  React.Component {
    constructor(props)
    {
        super(props);
        this.theme={
            tintColor:props.activeTintColor,
            updateTime: new Date().getTime()
        };
    }
    render(){
        const {routes,index} = this.props.navigationState;
        const {theme} = routes[index].params;
        if (theme && theme.updateTime > this.theme.updateTime){
            this.theme = theme;
        }
        return <TabBarBottom
        {...this.props}
        activeTintColor={this.theme.tintColor || this.props.activeTintColor}
    />
    }
}

export const AppTabNavigator = TabNavigator({
    PopularPage:{
        screen:PopularPage,
        navigationOptions: {
            title:'Popular',
            tabBarLabel:'热门',
            tabBarIcon: ({tintColor,focused}) => (
            <Image style={{width:27,height:27}} source={require('../res/images/ic_polular.png')}/>

            )
        }
    },
    TrendingPage:{
        screen:TrendingPage,
        navigationOptions: {
            tabBarLabel:'Trending',
            tabBarIcon: ({tintColor,focused}) => (
                <Image style={{width:27,height:27}} source={require('../res/images/ic_trending.png')}/>
            )
        }
    },

    Page1:{
        screen:Page1,
        navigationOptions: {
            title:'Popular',
            tabBarLabel:'Page1',
            tabBarIcon: ({tintColor,focused}) => (
                <Image style={{width:27,height:27}} source={require('../res/images/ic_favorite.png')}/>
            )
        }

    },
    Page2:{
        screen:Page2,
        navigationOptions: {
            tabBarLabel:'Page2',
            tabBarIcon:({tintColor,focused}) =>(
                <Ionicons
                    name={focused ? 'ios-people' : 'ios-people-outline'}
                    size={26}
                    style={{color:tintColor}}
                />
            )
        }

    },
    MyPage:{
        screen:MyPage,
        navigationOptions: {
            title:'我的',
            tabBarLabel:'我的',
            tabBarIcon:({tintColor,focused}) =>(
                <Image style={{width:27,height:27}} source={require('../res/images/ic_my.png')}/>
            )
        }

    }
},{
    tabBarComponent:TabBarComponent
});

export const AppStackNavigator = StackNavigator({
    HomePage:{
        screen:HomePage
    },
    Page1:{
        screen:Page1,
        navigationOptions: ({navigation}) => ({
               title:`${navigation.state.params.name}`// 动态穿值
                })

    },
    CustomKeyPage:{
      screen:CustomKeyPage,
    },
    SortKeyPage:{
        screen:SortKeyPage,
    },
    RepositooryDetail:{
        screen:RepositooryDetail,
    },
    TrendingTest:{
        screen:TrendingTest,
    },
    Page2:{
        screen:Page2,

    },
        Page3:{
            screen:Page3,
            navigationOptions:(props) => {
                const {navigation} = props;
                const {state,setParams} = navigation;
                const {params} = state;
                return {
                    title: params.title ? params.title : 'defult page3',
                    headerRight:(
                        <Button
                            title={params.mode === 'edit' ? '保存' : '编辑' }
                            onPress={() => {
                                setParams({mode:params.mode === 'edit' ? " " : "edit"})
                            }}
                        />
                    )
                }
            }
        },
        TabNav:{
            screen:AppTabNavigator,
            navigationOptions: ({navigation}) => ({
                title:`${navigation.state.params.title}`// 动态穿值
            })
        },
}
    ,{
        navigationOptions:{
            headerTintColor:"white",
            headerStyle:{
                backgroundColor:'#2196F3',
            }
        }
    }
    );