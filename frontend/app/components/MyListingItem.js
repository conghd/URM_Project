import React, {useEffect} from "react";
import {Dimensions, Image, StyleSheet, View,
  TouchableOpacity,
  ImageBackground} from "react-native";
import {Button, Text} from "react-native-paper";
import * as Config from "../../config";
import moment from "moment/moment";

const windowDimensions = Dimensions.get("window");
// const screenDimensions = Dimensions.get("screen");

// 0 - DELETE
// 1 - AVAILABLE
// 2 - SOLD
const STATUS_DELETE = 0;
const STATUS_AVAILABLE = 1;
const STATUS_SOLD = 2;
const MyListingItem = ({item, onPress, onSold, onDelete, onUpdateStatus, index}) => {
  const {title, price, images} = item;
  const style = (index % 2 == 0) ? {marginRight: 2}: {marginLeft: 2};
  const source = {uri: Config.BE_RESOURCE_URL +
    ((images && images.length > 0)? images[0] : "/images/no-image.jpeg")};
  const priceText = (price === "0" || price === 0 || price==="") ?
    "Free" : `$${price}`;
  {/**
*/}
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>

      <View style={[styles.infoContainer, style]}>
        <View styles={styles.half}>
          <ImageBackground
            style={styles.thumb}
            resizeMode='cover'
            source={source}
          >
            {item.status == STATUS_SOLD &&
            <Text style={styles.statusText} variant="bodyMedium">Sold</Text>
            }
          </ImageBackground>
        </View>

        <View styles={[styles.half]}>
          <Text variant='bodySmall'
            style={[styles.price, {}]}
            numberOfLines={2}
          >{priceText} - {title}
          </Text>
          <Text variant='labelSmall'
            style={styles.time}>
            {moment.utc(item.createdAt).local().startOf("seconds").fromNow()}
          </Text>

          <View style={styles.bottom}>
            {item.status == STATUS_AVAILABLE &&
              <Button mode="elevated" onPress={onSold} >Sold</Button>
            }
            {item.status == STATUS_SOLD &&
              <Button mode="elevated" onPress={() =>
                onUpdateStatus({status: 1})} >Sell</Button>
            }
            <Button onPress={() => {}} mode="outlined">Edit</Button>
            <Button style={{borderColor: "red"}}
              onPress={() =>
                onUpdateStatus({status: 0}) } mode="text">Delete</Button>
          </View>

        </View>
      </View>
    </TouchableOpacity>

  );
};
{/**
    </TouchableOpacity>
    */}
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
    // elevation: 1,
    marginVertical: 0,
    marginHorizontal: 0,
  },
  infoContainer: {
    flexDirection: "row",
    width: windowDimensions.width - 12,
    backgroundColor: "white",
    padding: 0,
    marginTop: 5,
    marginBottom: 0,
    // borderRadius: 5,
    borderWidth: 1,
    borderColor: "silver",
  },
  half: {
    flexDirection: "column",
  },
  statusText: {
    color: "white",
    marginBottom: 10,
    borderColor: "grey",
    borderWidth: 1,
    backgroundColor: "#666666",
    padding: 5,
  },
  thumb: {
    flex: 1,
    // height: 164,
    height: windowDimensions.width / 3 -9,
    width: windowDimensions.width / 3 - 9,
    // borderTopLeftRadius: 5,
    // borderTopRightRadius: 5,
    // borderRadius: 4,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bottom: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "space-between",
    margin: 10,
    marginBottom: 5,
  },
  name: {
    fontSize: 15,
    color: "#3a3a3a",
  },
  price: {
    width: 2 * windowDimensions.width / 3-9,
    padding: 10,
    overflow: "hidden",
    fontSize: 14,
    fontWeight: "400",
    color: "#3a3a3a",
  },
  time: {
    width: 2 * windowDimensions.width / 3-9,
    paddingLeft: 10,
    overflow: "hidden",
    fontSize: 12,
    fontWeight: "400",
    color: "#3a3a3a",
  },
});

export default MyListingItem;
