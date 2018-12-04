import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import HTMLView from 'react-native-htmlview';

export  default  class TrendingCell extends Component{
    constructor(props){
        super(props);
        console.log(this.props.data);
        this.state={

        }
    }
    render(){
        const  {data} = this.props;
        let  description = data.description;
        return <TouchableOpacity
            style={styles.container}
            onPress={this.props.onSelected}
        >
            <View style={styles.cell_container}>
                <Text style={styles.title}>{data.fullName}</Text>
                <HTMLView
                    value={description}
                    onLinkLongPress={(url) => {}}
                    stylesheet={{
                        p:styles.description,
                        a:styles.description
                    }}
                />
                <Text style={styles.description}>{data.meta}</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={styles.author}>Build by:</Text>
                        {data.contributors.map((result,i,arr)=>{
                            return <Image
                                key={i}
                                style={{height:22,width:22}}
                                source={{uri:arr[i]}}
                            />
                        })}

                    </View>
                    <Image
                        style={{width:22,height:22}}
                        source={require('../../res/images/ic_star.png')}
                    />
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