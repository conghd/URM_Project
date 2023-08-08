import * as React from 'react';
import { View, StyleSheet, TextInput, Dimensions } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {Text, Button } from 'react-native-paper';
import { BarCodeScanner } from "expo-barcode-scanner";
import { theme } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { getBookInfo, reset } from '../../services/advert/advertISBNSlice';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const ScannerScreen = ({navigation, route}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedBook, setScannedBook] = useState(null);
  const [isbn, setisbn] = useState("");


  const dispatch = useDispatch();

  const {isSuccess, isError, isLoading, message, book} = useSelector((state) => state.advertISBN)

  useEffect(() => {
    console.log("Scanner::useEffect()");
    /*
    navigation.setOptions({
      headerTitle: "TEST",
      
      headerSearchBarOptions: {
      },

      headerSearchBarOptions: {
          placeholder: "Search",
      }
    });
    */
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();

  }, []);

  useEffect(() => {
    console.log("ScannerScreen::useEffect[isSuccess]")
    if (isSuccess) {

      setScannedBook(book);
      dispatch(reset());
    }

  }, [isSuccess])

  useEffect(() => {
    console.log("ScannerScreen::useEffect[isError]")
    if (isError) {
      console.log(message);
      setScannedBook(null);
      dispatch(reset());
    }

  }, [isError])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setisbn(data)
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    dispatch(getBookInfo(data));
  };

  const handleScanAgain = () => {
    setScannedBook(null)
    setScanned(false);
    setisbn("");
  }


  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  return (
    <SafeAreaView style={theme.STYLE.container}>
      <View style={styles.sub}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      <View style={{...styles.sub2, marginTop: 10}}>
        {scanned && <Button mode='outlined' onPress={() => { handleScanAgain()} } >Scan Again</Button>}
        {!scanned && <Text variant='bodyMedium'>Scan ISBN code</Text>}
      </View>
      
      <View style={{...styles.sub, flexDirection: "column"}}>
      {
        <>
        <View style={{...styles.sub2, marginTop: 20}}>
        <View style={styles.flex1}>
            <Text variant='labelLarge'>ISBN</Text>
          </View>
          <View style={styles.flex2}>
            <Text variant='bodyMedium'>{isbn}</Text>
          </View>
      </View>
        <View style={styles.sub2}>
          <View style={styles.flex1}>
            <Text variant='labelLarge'>Title</Text>
          </View>
          <View style={styles.flex2}>
            <Text variant='bodyMedium'>{scannedBook && scannedBook.title}</Text>
          </View>
        </View>

        {/** Authors */}
        <View style={styles.sub2}>
          <View style={styles.flex1}>
            <Text variant='labelLarge'>Authors</Text>
          </View>
          <View style={styles.flex2}>
            <Text variant='bodyMedium'>{scannedBook && scannedBook.authors.join(', ')}</Text>
          </View>
        </View>

        {/** Publisher */}
        <View style={styles.sub2}>
          <View style={styles.flex1}>
            <Text variant='labelLarge'>Publisher</Text>
          </View>
          <View style={styles.flex2}>
            <Text variant='bodyMedium'>{scannedBook && scannedBook.publisher}</Text>
          </View>
        </View>

        <View style={styles.sub2}>
        </View>
        <View style={styles.sub2}>
        </View>
        <View style={styles.sub2}>
          <View style={{flex: 1, padding: 10}} >
            <Button mode='outlined' onPress={() => { navigation.goBack() }}>Cancel</Button>
          </View>
          <View style={{flex: 1, padding: 10}} >
            <Button mode='contained' onPress={() => { navigation.navigate("CreationScreen", {book: scannedBook}, true)}}>OK</Button>
          </View>
        </View>
        </>
      }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#FFFF00",
    flex: 1,
    justifyContent: "center",
    //alignItems: "center",
    flexDirection: "column",
  },
  sub: {
    marginTop: 10,
    width: windowDimensions.width,
    minHeight: windowDimensions.height / 2,
    //height:windowDimensions.height/2,
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
  }


});

export default ScannerScreen;
