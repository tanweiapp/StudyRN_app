import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import HTMLView from 'react-native-htmlview';

export  default  class TrendingCell extends Component{
    constructor(props){
        super(props);
        console.log(this.props.data);
        this.state={
            isFavorite:this.props.projectModel.isFavorite,
            favoriteIcon:this.props.projectModel.isFavorite?require('../../res/images/ic_star.png'):require('../../res/images/ic_unstar_transparent.png')
        }
    }
    onPressFavorite(){
        this.setFavoriteState(!this.state.isFavorite);
        this.props.onFavorite(this.props.projectModel.item,!this.state.isFavorite)
    }
    setFavoriteState(isFavorite){
        this.setState({
            isFavorite:isFavorite,
            favoriteIcon:isFavorite?require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png'),
        })
    }

    render(){
        const  {data} = this.props;
        let item = this.props.projectModel.item? this.props.projectModel.item: this.props.projectModel;
        let  description = item.description;
        let  favoriteButton = <TouchableOpacity
            onPress={()=>this.onPressFavorite()}
        >
            <Image
                style={{width:22,height:22,tintColor:'#2196F3'}}
                source={this.state.favoriteIcon}
            />
        </TouchableOpacity>
        return <TouchableOpacity
            style={styles.container}
            onPress={this.props.onSelected}
        >
            <View style={styles.cell_container}>
                <Text style={styles.title}>{item.fullName}</Text>
                <HTMLView
                    value={description}
                    onLinkLongPress={(url) => {}}
                    stylesheet={{
                        p:styles.description,
                        a:styles.description
                    }}
                />
                <Text style={styles.description}>{item.meta}</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={styles.author}>Build by:</Text>
                        {item.contributors.map((result,i,arr)=>{
                            return <Image
                                key={i}
                                style={{height:22,width:22}}
                                source={{uri:arr[i]}}
                            />
                        })}

                    </View>
                    {favoriteButton}
                </View>

            </View>
        </TouchableOpacity>
    }
}

const  styles = StyleSheet.create({
    author:{
        fontSize:14,
        marginBottom:2,
        color:'#757575',
    },
    title:{
        fontSize:16,
        marginBottom:2,
        color:'#212121'
    },
    description:{
        fontSize:14,
        marginBottom:2,
        color:'#757575',
        borderRadius:2,
    },
    container:{
        flex:1,
    },
    cell_container:{
        backgroundColor:'white',
        padding:10,
        marginLeft:5,
        marginRight:5,
        marginVertical:3,
        borderWidth:0.5,
    },
})