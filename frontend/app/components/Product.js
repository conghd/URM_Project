import React, {useEffect} from "react";
import {Dimensions, Image, StyleSheet, View,
  TouchableOpacity} from "react-native";
import {Text} from "react-native-paper";
import {Appbar} from "react-native-paper";
import * as Config from "../../config";
/*
          */


const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");
const Product = ({_id, title, price, images, onPress, index}) => {
  const style = (index % 2 == 0) ? {marginRight: 2}: {marginLeft: 2};

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={{...styles.infoContainer, ...style}}>
        <Image style={styles.thumb} source={
            (images && images.length > 0) ?
                ({uri: Config.BE_RESOURCE_URL + images[0]}) :
                ({uri: Config.BE_RESOURCE_URL + "/images/no-image-available.jpeg"})
        }
        resizeMode='cover'
        />
        <View style={styles.bottomText}>
          <Text
            variant='labelSmall'
            style={styles.price}>
            {(price === "0" || price === 0 || price === "") ?
              "FREE": `$${price}` }- {title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    // backgroundColor: 'white',
    // borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 0,
    shadowColor: "black",
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 0,
    marginHorizontal: 0,
  },
  thumb: {
    height: 164,
    // height: windowDimensions.width / 2 -2,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    // width: '100%',
    width: windowDimensions.width / 2 - 2,
    // borderWidth: 1,
    borderColor: "gray",
  },
  infoContainer: {
    backgroundColor: "white",
    padding: 0,
    marginBottom: 5,
    borderRadius: 5,
  },
  bottomText: {
    justifyContent: "center",
    paddingLeft: 10,
    paddingTop: 5,
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#272727",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#272727",
  },
});

export default Product;
