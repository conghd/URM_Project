import React, {useState, useEffect} from "react";
import {StyleSheet, View, Image, Dimensions, TouchableOpacity, ImageBackground}
  from "react-native";
import {IconButton, Text} from "react-native-paper";


const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
const minWidth = window.width / 3;
const delta = 10;

const ImagePreviewItem = ({item, handlePress, handleDeleteImage}) => {
  return (
    <TouchableOpacity style={styles.container}
      onPress={() => handlePress(item.id, item.name)} >
      {item.id == 0 ? (
      <View style={styles.button}>
        <Image source={require("../../assets/icons8-add-64.png")} />
        <Text variant="bodySmall">Add photos</Text>
      </View>) : (
      <ImageBackground
        style={styles.img}
        imageStyle={{borderRadius: 5}}
        source={{uri: item.uri}}>
        <IconButton
          style={styles.icon}
          icon="close-circle-outline"
          iconColor="#efefef"
          // containerColor="#aaaaaaff"
          size={30}
          onPress={() => handleDeleteImage(item.id)}
        />
      </ImageBackground>

      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    marginRight: 5,
    marginLeft: 5,
    // backgroundColor: "#666666",
    justifyContent: "space-around",
    alignSelf: "center",
    minWidth: minWidth - delta,
    height: minWidth + delta,
    // height: 108,
  },
  photo: {
    resizeMethod: "scale",
    resizeMode: "cover",

  },
  button: {
    flex: 1,
    // backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "grey",
    marginLeft: 5,
  },
  img: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: "#FF0000",
    // borderRadius: 6,
    // border: 1,
    resizeMethod: "scale",
    resizeMode: "cover",
    alignSelf: "center",
    aspectRatio: 1/1,
    justifyContent: "flex-end",
  },
  icon: {
    // color: "red",
    // backgroundColor: "#666666ff",
    marginTop: -2,
    marginRight: -2,
    // color: "#aeaeae",
  },
});

export default ImagePreviewItem;
