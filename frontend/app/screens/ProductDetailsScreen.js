import { useEffect, useState } from 'react';
import * as Config from '../../config';
import { Text, 
  View,
  ScrollView,
  StyleSheet
} from 'react-native'
import { Button, IconButton } from 'react-native-paper';
import Slideshow from 'react-native-image-slider-show';
import MapView, { Marker } from 'react-native-maps';

const ProductDetailsScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const images = item.images.map((image) => { return {url: Config.BE_RESOURCE_URL + image} });
  const coordinate = {
    latitude: +50.445210,
    longitude: -104.618896
  };

  const initialRegion = {
      ...coordinate,
      latitudeDelta: 0.01922,
      longitudeDelta: 0.01421,
  };


    useEffect(() => {
      console.log("ProductDetailsScreen::useEffect()");

    }, []);
    return (
      <View style={styles.container} >
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.sliderBox}>
          <Slideshow 
            dataSource={ images }/>
        </View>
        <View style={styles.header}>
            <View style={{flex: 5}}>
              <Text style={styles.title }>{item.title}</Text>
              <Text style={styles.price}>
              { (item.price === 0 || item.price === "") ? ("FREE") : ("$" + item.price)}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <IconButton icon="bookmark"
                size={50}
                onPress={() => console.log("Bookmark")}
                iconColor='gray'
                
                />
            </View>

        </View>
        {/**
        <View style={[styles.header, {marginTop: 0}] }>
            <Text style={styles.price}>
              { (item.price === 0 || item.price === "") ? ("FREE") : ("$" + item.price)}
              </Text>
        </View>
        */}
        <View style={styles.sellerHeader}>
            <Text style={[styles.detailsHeader, {fontWeight: "bold"}]}>Seller</Text>
            </View>
        <View style={[styles.sellerHeader, {marginTop: 0}] }>
            <Text style={styles.seller}>{item.user.name}</Text>
            {/** 
            <Button mode="outlined" icon="send" style={styles.seller}>Message</Button >
            */}
        </View>

        <View style={styles.locationHeader}>
          <View style={styles.mapSection}>
                  <View style={styles.mapHeader} >
                      <Text style={styles.mapTitle}>Location</Text>
                  </View>
                  <View style={styles.mapContainer} >
                      <MapView  style={styles.mapView} initialRegion={initialRegion}
                          loadingEnabled={true}
                          loadingIndicatorColor="#666666"
                          loadingBackgroundColor="#eeeeee"
                          provider="google" >
                          <Marker coordinate={initialRegion} title={item.user.name} />
                      </MapView>
                  </View>
          </View>
        </View>
        <View style={styles.details} >
          <Text style={styles.detailsHeader}>Details</Text>
          <Text style={styles.condition}>Condition: {item.condition}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </ScrollView>
      </View>

    );
  };

export default ProductDetailsScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
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
    flex: 1,
    flexDirection: "row",
    fontSize: 24,
    color: "#272727",
    alignSelf: "flex-start",
    textAlign: "left",
  },
  priceHeader: {

  },
  price: {
    flex:1,
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
    fontSize: 18,
    textAlign: "left",
    color: "#176fdb",
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
    alignItems: "flex-start"
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
    marginTop: 15
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
    backgroundColor: '#0063E5',
    padding: 10,
    margin: 10,
    width: 360,
    alignItems: "center",
  },
  btn_text: {
    fontSize: 23,
    color: '#fff',
  },
  loginContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6'
  },
  textInput: {
    marginTop: 20,
    height: 40,
    width: 360,
    margin: 10,
    backgroundColor: 'white',
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
    color: 'red',
  },
});