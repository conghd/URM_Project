import * as React from "react";
import {View, StyleSheet, TextInput, Dimensions, ScrollView, SafeAreaView} from "react-native";
import {useState, useEffect, useRef} from "react";
import {Text, Button} from "react-native-paper";
import {theme} from "../../constants";
import {useDispatch, useSelector} from "react-redux";
import * as Location from "expo-location";
import MapView, {PROVIDER_GOOGLE, Marker} from "react-native-maps";

const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

const LocationScreen = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  const initialRegion = {
    longitude: -104.59992055790927,
    latitude: 50.4139135033365,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const [region, setRegion] = useState(initialRegion);
  const mapRef = React.useRef();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => (
        <Button mode="text" onPress={() => {
          navigation.goBack();
        }}
        >Cancel</Button>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    (async () => {
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const {longitude, latitude} = location.coords;
      setCurrentLocation({longitude, latitude, latitudeDelta: 0.0922,
        longitudeDelta: 0.0421});
      console.log(JSON.stringify(location));
    })();
  }, []);

  const loadAddress= async () => {
    setIsLoading(true);
    const {longitude, latitude} = region;
    const response = await Location.reverseGeocodeAsync({longitude, latitude});

    for (const item of response) {
      console.log("ITEM: " + JSON.stringify(item));
      setAddress(item);
      return item;
    }

    setIsLoading(false);
  };

  const handleApply = () => {
    const promise = loadAddress();
    promise.then((address) => {
      setIsSuccess(true);
      console.log("DONE");
      console.log(JSON.stringify(address));
    });
  };

  useEffect(() => {
    if (isSuccess) {
      const {postalCode, city, street} = address;
      const name = `${street}, ${city}`;
      navigation.navigate("CreationScreen",
          {loc: {...region, name, postalCode}});
    }
  }, [isSuccess]);

  return (
    <SafeAreaView style={theme.STYLE.container}>
      <View style={[theme.STYLE.row, styles.maps]}>
        <MapView
          ref={mapRef}
          style={styles.mapView}
          provider={PROVIDER_GOOGLE}
          customMapStyle={{height: windowDimensions.height/2,
            width: windowDimensions.width}}
          initialRegion={region} onRegionChange={(newRegion) => {
            // console.log(JSON.stringify(newRegion));
            setRegion(newRegion);
          }}
        >
          <Marker coordinate={region} ></Marker>
        </MapView>
      </View>
      <View style={[theme.STYLE.row, styles.search]}>
        <Button mode="outlined" onPress={() => {
          setRegion(currentLocation);
          mapRef.current.animateToRegion(currentLocation, 3000);
        }}>Current Location</Button>
      </View>
      <View style={[theme.STYLE.row, styles.control]}>
        <Button style={styles.button} mode="contained"
          animating={isLoading} onPress={handleApply}
        >Apply</Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {

  },
  search: {
    margin: 10,
  },
  maps: {
    backgroundColor: "green",
    flex: 1,
    width: windowDimensions.width,
  },

  mapView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "red",
  },
  control: {
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    margin: 10,
  },
});

export default LocationScreen;
