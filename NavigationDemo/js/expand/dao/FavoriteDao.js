
import React, {Component} from 'react';
import {Platform,
    StyleSheet,
    Text,
    View,
    AsyncStorage,
} from 'react-native';
import keys from '../../../res/data/keys.json';
import langsData from '../../../res/data/langs.json';

const  FAVORITE_KEY_PREFIX='favorite_';
export default class FavoriteDao {
    constructor(flag) {
        this.flag = flag;
        this.favoriteKey = FAVORITE_KEY_PREFIX+flag;
    }

    /**
     *
     *  收藏项目
     *
     * */
    saveFavoriteItem(key,value,callBack){
        AsyncStorage.setItem(key,value,(error)=>{
            if (!error){
                this.updateFavoriteKeys(key,true);
            }
        })
    }

    /**
     *
     * 更新Favorite key 集合
     * */
    updateFavoriteKeys(key,isAdd){
        AsyncStorage.getItem(this.favoriteKey,(error,result)=>{
            if(!error){
                var favoriteKeys = [];
                if (result){
                    favoriteKeys = JSON.parse(result);
                }
                var index = favoriteKeys.indexOf(key);
                if (isAdd){
                    if(index === -1)favoriteKeys.push(key);
                }else {
                    if (index!==-1)favoriteKeys.splice(index,1);
                }
                AsyncStorage.setItem(this.favoriteKey,JSON.stringify(favoriteKeys));
            }
        })
    }
    /**
     * 获取收藏的项目
     *
     * **/
    getFavoriteKeys(){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(this.favoriteKey,(error,result)=>{
                if(!error){
                    try {
                        resolve(JSON.parse(result))
                    }catch (e){
                        reject(e);
                    }
                }else {
                    reject(error);
                }
            })
        })
    }
    removeFavoriteItem(key){
        AsyncStorage.removeItem(key,(error)=>{
            if(!error){
                this.updateFavoriteKeys(key,false)
            }
        })
    }
}
