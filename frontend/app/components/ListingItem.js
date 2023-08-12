import React, {useEffect} from "react";
import {Dimensions, Image, StyleSheet, View,
  TouchableOpacity} from "react-native";
import {Text} from "react-native-paper";
import * as Config from "../../config";

const windowDimensions = Dimensions.get("window");
// const screenDimensions = Dimensions.get("screen");


const ListingItem = ({_id, title, price, images, onPress, index}) => {
  const style = (index % 2 == 0) ? {marginRight: 2}: {marginLeft: 2};
  const source = {uri: Config.BE_RESOURCE_URL +
    ((images && images.length > 0)? images[0] : "/images/no-image.jpeg")};
  const priceText = (price === "0" || price === 0 || price==="") ?
    "Free" : `${price}`;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={[styles.infoContainer, style]}>
        <Image
          style={styles.thumb}
          resizeMode='cover'
          source={source}
        />
        <View
          style={styles.bottomText}>
          <Text
            variant='bodySmall'
            style={styles.price}
            numberOfLines={1}
          >
            {priceText} - {title}
          </Text>
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
    backgroundColor: "#efefef",
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
  infoContainer: {
    width: windowDimensions.width / 2 - 7,
    backgroundColor: "white",
    padding: 0,
    // marginBottom: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "silver",
  },
  thumb: {
    flex: 1,
    // height: 164,
    height: windowDimensions.width / 2 -9,
    width: windowDimensions.width / 2 - 9,
    // borderTopLeftRadius: 5,
    // borderTopRightRadius: 5,
    borderRadius: 4,
  },
  bottomText: {
    justifyContent: "center",
    paddingLeft: 5,
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#272727",
  },
  price: {
    // overflow: "hidden",
    fontSize: 16,
    fontWeight: "600",
    color: "#272727",
  },
});

export default ListingItem;
