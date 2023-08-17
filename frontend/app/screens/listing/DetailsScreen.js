import React, {useEffect, useState} from "react";
import * as Config from "../../../config";
import {Text,
  View,
  ScrollView,
  StyleSheet, SafeAreaView,
} from "react-native";
import {Button, IconButton} from "react-native-paper";
// import Slideshow from "react-native-image-slider-show";
import Slideshow from "../../components/Slideshow";
import MapView, {Marker} from "react-native-maps";

const DetailsScreen = ({navigation, route}) => {
  const {item} = route.params;
  const images = item.images.map((image) => {
    return {url: Config.BE_RESOURCE_URL + image};
  });
  if (images.length == 0) {
    images.push({url: Config.BE_RESOURCE_URL +
      "/images/no-image-available.jpeg"});
  }


  const [bookmark, setBookmark] = useState(false);
  const location = JSON.parse(item.location);
  const {longitude, latitude, longitudeDelta, latitudeDelta} = location;
  const initialRegion = {
    longitude,
    latitude,
    longitudeDelta,
    latitudeDelta,
  };
  const coordinate = {
    latitude: +50.445210,
    longitude: -104.618896,
  };


  useEffect(() => {
    console.log("DetailsScreen::useEffect()");
  }, []);
  return (
    <SafeAreaView style={styles.container} >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.sliderBox}>
          <Slideshow
            height={320}
            dataSource={ images }/>
        </View>
        <View style={styles.header}>
          <View style={{flex: 5}}>
            <Text style={styles.title }>{item.title}</Text>
            <Text style={styles.price}>
              { (item.price === 0 || item.price === "0" || item.price === "") ?
              ("FREE") : ("$" + item.price)}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <IconButton icon={bookmark ? "bookmark" : "bookmark-outline"}
              size={40}
              onPress={() => {
                setBookmark(!bookmark);
              }}
              iconColor='gray'
            />
          </View>

        </View>
        <View style={styles.details} >
          <Text style={styles.condition}>Authors: {item.authors}</Text>
          <Text style={styles.description}>Publisher: {item.publisher}</Text>
          <Text style={styles.description}>Number of pages: {item.pageCount}</Text>
          <Text style={styles.description}>ISBN: {item.ISBN}</Text>
        </View>
        {/**
        <View style={[styles.header, {marginTop: 0}] }>
            <Text style={styles.price}>
              { (item.price === 0 || item.price === "") ?
                ("FREE") : ("$" + item.price)}
              </Text>
        </View>
        */}
        <View style={styles.sellerHeader}>
          <Text style={[styles.detailsHeader, {fontWeight: "bold"}]}>
            Seller</Text>
        </View>
        <View style={[styles.sellerHeader, {marginTop: 0}] }>
          <Text style={styles.seller}>
            {item.user != null ? item.user.name : "Unknown"} - {item.phoneNumber}
          </Text>

          {/**
            <Button mode="outlined" icon="send"
            style={styles.seller}>Message</Button >
            */}
        </View>

        <View style={styles.locationHeader}>
          <View style={styles.mapSection}>
            <View style={styles.mapHeader} >
              <Text style={styles.mapTitle}>Location</Text>
            </View>
            <View style={styles.mapContainer} >
              <MapView style={styles.mapView}
                initialRegion={initialRegion}
                loadingEnabled={true}
                loadingIndicatorColor="#666666"
                loadingBackgroundColor="#eeeeee"
                provider="google" >
                <Marker coordinate={initialRegion}
                  title={item.user.name} />
              </MapView>
            </View>
          </View>
        </View>
        <View style={styles.sellerHeader}>

        </View>
        <View style={styles.details} >
          <Text style={[styles.detailsHeader, {fontWeight: "bold"}]}>
          Description</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

export default DetailsScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
  },
  sliderBox: {
    flex: 3,
  },
  header: {
    flex: 1,
    marginTop: 5,
    paddingLeft: 10,
    flexDirection: "row",
  },
  title: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    fontSize: 20,
    color: "#272727",
    alignSelf: "flex-start",
    textAlign: "left",
  },
  priceHeader: {

  },
  price: {
    flex: 1,
    flexDirection: "row",
    fontSize: 18,
  },
  sellerHeader: {
    marginTop: 15,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    paddingLeft: 10,
  },
  seller: {
    marginLeft: 20,
    fontSize: 14,
    textAlign: "left",
    // color: "#176fdb",
  },
  details: {
    flex: 2,
    flexDirection: "column",
  },
  mapSection: {
    marginTop: 10,
    height: 320,
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 10,
  },
  mapHeader: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  mapTitle: {
    flex: 1,
    marginLeft: 10,
    alignSelf: "flex-start",
    textAlign: "left",
    fontSize: 18,
    fontWeight: "bold",
    color: "#272727",
  },
  mapContainer: {
    paddingTop: 5,
    flex: 12,
    flexDirection: "row",
  },
  mapView: {
    flex: 1,
  },
  logo: {
    resizeMode: "cover",
  },

  details: {
    flex: 1,
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 30,
  },
  condition: {

  },
  description: {
    marginTop: 10,
  },
  detailsHeader: {
    fontSize: 18,
  },
  bottom: {
    marginTop: 80,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 360,
  },
  modal: {
    backgroundColor: "#FFFFFF",
    height: 240,
    flex: 1,
    padding: 20,
    marginTop: 50,
    marginBottom: 50,
  },
  btn: {
    backgroundColor: "#0063E5",
    padding: 10,
    margin: 10,
    width: 360,
    alignItems: "center",
  },
  btn_text: {
    fontSize: 23,
    color: "#fff",
  },
  loginContainer: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    elevation: 10,
    backgroundColor: "#e6e6e6",
  },
  textInput: {
    marginTop: 20,
    height: 40,
    width: 360,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  text: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    color: "#272727",
  },
  linkText: {
    color: "#176fdb",
  },
  errorText: {
    flex: 1,
    paddingLeft: 40,
    fontSize: 12,
    color: "red",
  },
});
