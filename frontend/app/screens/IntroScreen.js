import 'react-native-gesture-handler';
//import { StatusBar } from 'expo-status-bar';
import { Dimensions, ScrollView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PixelRatio, StyleSheet, Text, View } from 'react-native';
import { Button }from 'react-native-paper';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../services/settings/settingsSlice';
import { Image } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

const IntroScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const { width, height } = Dimensions.get("window");
  //console.log("width: " + width + ", height: " + height);
  const { isFirstTime, message} = useSelector((state) => state.settings)

  const handleSubmit = () => {
    console.log("IntroScreen::handleSubmit");
    dispatch(update({"isFirstTime": false}))
  }

  useEffect(() => {
    console.log("IntroScreen::useEffect[], isFirstTime: " + isFirstTime)
  }, []);

  useEffect(() => {
    console.log("IntroScreen::useEffect[], isFirstTime: " + isFirstTime)

  }, [isFirstTime]);

  const setSliderPage = (event) => {
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;
    //console.log("x = " + x + ", width = " + width);
    const indexOfNextScreen = Math.floor(x / (width - 1));

    //console.log("indexOfNextScreen: " + indexOfNextScreen);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  const { currentPage: pageIndex } = sliderState;

  const SLIDES = [
    {
      image: require("../../assets/images/book0.png"),
      title: "UR Marketplace",
      description: "Textbook exchange"
    },
    {
      image: require("../../assets/images/book0.png"),
      title: "Wanna sell",
      description: "...some old textbooks?"
    },
    {
      image: require("../../assets/images/book1.png"),
      title: "Wanna buy",
      description: "...some textbooks for incoming courses?"
    },
    {
      image: require("../../assets/images/book2.png"),
      title: "Wanna join",
      description: "...a close-knit community"
    },
  ];

  return (
    <>
      <StatusBar barStyle="default" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            setSliderPage(event);
          }}
        >
        { SLIDES.map((slide, i) => {
          return (
            <View key={i} style={{ width, height }}>
              <View style={styles.wrapper}>
                <Image
                  resizeMode='contain'
                  source={ slide.image }
                  style={styles.imageStyle} />
              </View>
              <View style={styles.wrapper}>
                <Text style={styles.header}>{isFirstTime ? "HELLO" : slide.title }</Text>
                <Text style={styles.paragraph}>{slide.description}</Text>
                <Text style={styles.paragraph}>{message}</Text>
              </View>
            </View>
          )
        })}
        </ScrollView>

        <View style={ styles.bottom }>
          <View style={ styles.get_started }>
            <Button mode='outlined' onPress={() => { handleSubmit() } }>Get Started</Button>
          </View>
          <View style={styles.paginationWrapper}>
            {Array.from(Array(4).keys()).map((key, index) => (
              <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    imageStyle: {
      height: PixelRatio.getPixelSizeForLayoutSize(135),
      //alignSelf: "center",
      width: '100%',
    },
    wrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 30,
    },
    header: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    paragraph: {
      fontSize: 17,
    },
    bottom: {
      flexDirection: "column",
      position: 'absolute',
      bottom: 30,
      left: 0,
      right: 0,
    },
    get_started: {
      margin: 20,
    },
    paginationWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    paginationDots: {
      height: 10,
      width: 10,
      borderRadius: 10 / 2,
      //backgroundColor: '#0898A0',
      backgroundColor: '#0055d2',
      marginLeft: 10,
    },

});
export default IntroScreen;