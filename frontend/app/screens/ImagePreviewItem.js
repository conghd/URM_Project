import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { IconButton } from 'react-native-paper';


const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
const minWidth = window.width / 4;
const delta = 10;

export default function ImagePreviewItem({item, handlePress, handleDeleteImage }) {
    return (
        <TouchableOpacity style={styles.container}
            onPress={() => handlePress(item.id, item.name)} >
            <ImageBackground
                style={styles.img}
                source={item.id=='0' ?
                    require('../../assets/icons8-add-64.png') :
                    //require('../../assets/icons8-add-64.png') :
                    //require('../../assets/image-add-64.png') :
                    //require('../../assets/tree-1578.png')
                    {uri: item.uri}
                }>
                { item.id != 0 ? (
                    <IconButton 
                        style={styles.icon}
                        icon="close-circle-outline"
                        iconColor="#aeaeae"
                        size={20}
                        onPress={() => handleDeleteImage(item.id)}
                        />

                    ): (
                        <></>
                )}
            </ImageBackground>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        marginRight: 5,
        marginLeft: 5,
        //backgroundColor: '#666666',
        justifyContent: 'space-around',
        alignSelf: 'center',
        width: minWidth - delta, 
        height: 108
    },
    img: {
        flex: 1,
        flexDirection: "row",
        //backgroundColor: '#FF0000',
        borderRadius: 6,
        resizeMethod: 'scale',
        resizeMode: 'cover',
        alignSelf: 'center',
        aspectRatio: 1/1,
        justifyContent: "flex-end",
    },
    icon: {
        marginTop: -2,
        marginRight: -2,
        color: "#aeaeae"
    }
});