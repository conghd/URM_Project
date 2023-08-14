import * as React from "react";
import {View, StyleSheet, TextInput, Dimensions, ScrollView, SafeAreaView} from "react-native";
import {useState, useEffect} from "react";
import {Text, Button} from "react-native-paper";
import {BarCodeScanner} from "expo-barcode-scanner";
import {theme} from "../../constants";
import {useDispatch, useSelector} from "react-redux";
import {getBookInfo, reset} from "../../services/advert/advertISBNSlice";

const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

const LocationScreen = ({navigation, route}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedBook, setScannedBook] = useState(null);
  const [isbn, setisbn] = useState("");


  const dispatch = useDispatch();

  const {isSuccess, isError, isLoading, message, book} =
   useSelector((state) => state.advertISBN);

  useEffect(() => {
    console.log("Scanner::useEffect(): width: " + windowDimensions.width);
    const getBarCodeScannerPermissions = async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  useEffect(() => {
    console.log("ScannerScreen::useEffect[isSuccess]");
    if (isSuccess) {
      setScannedBook(book);
      dispatch(reset());
    }
  }, [isSuccess]);

  useEffect(() => {
    console.log("ScannerScreen::useEffect[isError]");
    if (isError) {
      console.log(message);
      setScannedBook(null);
      dispatch(reset());
    }
  }, [isError]);

  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    setisbn(data);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    dispatch(getBookInfo(data));
  };

  const handleScanAgain = () => {
    setScannedBook(null);
    setScanned(false);
    setisbn("");
  };


  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={theme.STYLE.container}>
      <View style={[theme.STYLE.row, styles.search]}>
      </View>
      <View style={[theme.STYLE.row, styles.maps]}>
      </View>
      <View style={[theme.STYLE.row, styles.control]}>
        <Button mode="contained">Apply</Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {

  },
  search: {

  },
  maps: {

  },
  control: {

  },
});

export default LocationScreen;

