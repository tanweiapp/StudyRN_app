import React, {Component} from 'react';
import {Platform,
    StyleSheet,
    Text,
    View,
    AsyncStorage,
} from 'react-native';
import GitHubTrending from 'GitHubTrending'
export var FLAG_STORAGE={flag_popular:'popular',flag_trending:'trending'};
export default class DataRepository {
    constructor(flag){
        this.flag=flag;
        if(flag===FLAG_STORAGE.flag_trending)this.trending = new GitHubTrending();
    }
    fetchRepository(url){
        return  new Promise((resolve,reject)=>{
            //获取本地数据
            console.log(url);
            this.fetchLocalRepository(url)
                .then(result=>{
                    if(result){
                        resolve(result);
                    }else{
                        this.fetchNetRepository(url)
                            .then(result=>{
                                resolve(result);
                            })
                            .catch(e=>{
                                reject(e);
                            })
                    }

                })
                .catch(e=>{
                    this.fetchNetRepository(url)
                        .then(result=>{
                            resolve(result);
                        })
                        .catch(e=>{
                            reject(e);
                        })
                })
        })
    }

    fetchLocalRepository(url){
        return  new Promise((resolve,reject)=>{
            //获取本地数据
            AsyncStorage.getItem(url,(error,result)=>{
                if(!error){
                    try {
                        resolve(JSON.parse(result));
                    }catch (e){
                        reject(e);
                    }

                }else{
                    reject(error);
                }
            })
        })
    }
    fetchNetRepository(url){
        return new Promise((resolve,reject)=>{
            if(this.flag==='trending'){
                console.log('网络请求的标示'+ this.flag);
                this.trending.fetchTrending(url)
                    .then(result=>{
                        console.log('trendingResponse'+ result);
                        if(!result){
                            reject(new Error('responseData is null'));
                            return;
                        }else{
                            resolve(result);
                            this.saveRepository(url, result);
                        }
                    })
                    .catch(error=>{

                    })
            }else {
                fetch(url)
                    .then(response => response.json())
                    .then(result => {
                        if (!result) {
                            reject(new Error('responseData is null'));
                            return;
                        }
                        resolve(result.items);
                        this.saveRepository(url, result.items);
                    })
                    .catch(error => {
                        reject(error);
                    })
            }
        })
    }

    saveRepository(url,items,callBack){
        if(!url||!items)return;
        let  wrapData ={items:items,update_date:new Date().getTime()};
        AsyncStorage.setItem(url,JSON.stringify(wrapData),callBack);
    }

    checkDate(longTime){
        // return false;
        let  cDate = new Date();
        let  tDate = new Date();
        tDate.setTime(longTime);
        if(cDate.getMonth()!==tDate.getMonth())return false;
        if(cDate.getDay()!==tDate.getDay())return false;
        if(cDate.getHours()-tDate.getHours()>4)return false;
        return true;
    }
}