import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'

export  default  class RepositoryItemCell extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return <TouchableOpacity
                            style={styles.container}
                            onPress={this.props.onSelected}
        >
        <View style={styles.cell_container}>
            <Text style={styles.title}>{this.props.data.full_name}</Text>
            <Text style={styles.title}>{this.props.data.description}</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text>Author:</Text>
                    <Image
                        style={{height:22,width:22}}
                        source={{uri:this.props.data.owner.avatar_url}}
                    />
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text>Stars:</Text>
                    <Text>{this.props.data.stargazers_count}</Text>
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