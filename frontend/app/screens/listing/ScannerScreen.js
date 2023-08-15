import * as React from "react";
import {View, StyleSheet, TextInput, Dimensions, ScrollView, SafeAreaView} from "react-native";
import * as SecureStore from "expo-secure-store";
import {useState, useEffect} from "react";
import {useNavigation} from "@react-navigation/native";
import {Text, Button} from "react-native-paper";
import {BarCodeScanner} from "expo-barcode-scanner";
import {theme} from "../../constants";
import {useDispatch, useSelector} from "react-redux";
import {getBookInfo, reset} from "../../services/advert/advertISBNSlice";

const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

const ScannerScreen = ({navigation, route}) => {
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
      <View style={[theme.STYLE.row, styles.camera]}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      <View style={[theme.STYLE.row, {marginTop: 10}]}>
        {scanned && <Button mode='outlined' onPress={() => {
          handleScanAgain();
        } } >Scan Again</Button>}
        {!scanned && <Text variant='bodyMedium'>Scan ISBN code</Text>}
      </View>

      <View style={[styles.row]}>
        <View style={styles.sub2}>
          <Text style={styles.flex1} variant='labelLarge'>ISBN</Text>
          <Text style={styles.flex2} variant='bodyMedium'>{isbn}</Text>
        </View>
        <View style={styles.sub2}>
          <Text style={styles.flex1} variant='labelLarge'>Title</Text>
          <Text style={styles.flex2} variant='bodyMedium'>
            {scannedBook && scannedBook.title}</Text>
        </View>

        {/** Authors */}
        <View style={styles.sub2}>
          <Text style={styles.flex1} variant='labelLarge'>Authors</Text>
          <Text style={styles.flex2} variant='bodyMedium'>
            {scannedBook && scannedBook.authors.join(", ")}</Text>
        </View>

        {/** Publisher */}
        <View style={styles.sub2}>
          <Text style={styles.flex1} variant='labelLarge'>Publisher</Text>
          <Text style={styles.flex2} variant='bodyMedium'>
            {scannedBook && scannedBook.publisher}</Text>
        </View>

        <View style={styles.sub2}>
          <Button style={[styles.flex1, {margin: 15}]} mode='outlined' onPress={() => {
            navigation.goBack();
          }}>Cancel</Button>
          <Button style={[styles.flex1, {margin: 15}]} mode='contained' onPress={() => {
            navigation.navigate("CreationScreen",
                {book: scannedBook}, true);
          }}>OK</Button>

        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  camera: {
    // backgroundColor: "green",
    aspectRatio: 1,
    flex: 1,
    marginTop: 0,
    background: "green",
    width: windowDimensions.width,
    height: windowDimensions.width,
    minHeight: windowDimensions.width,
  },

  row: {
    flex: 1,
    width: "100%",
    marginTop: 10,

    height: windowDimensions.width,
    minHeight: windowDimensions.height / 2,
    // height:windowDimensions.height/2,
  },
  flex1: {
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
  },
  flex2: {
    paddingLeft: 10,
    paddingRight: 10,
    flex: 3,

  },
  sub2: {
    flexDirection: "row",
    marginLeft: 10,
    marginBottom: 10,
    alignItems: "flex-start",
  },
  sub3: {
    flex: 1,
    padding: 10,
  },
});

export default ScannerScreen;
