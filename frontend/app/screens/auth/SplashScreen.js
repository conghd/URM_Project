import React, {useEffect} from "react";
import {Text, View, StyleSheet} from "react-native";


const SplashScreen = () => {
  useEffect(() => {
    console.log("SplashScreen::useEffect()");
  }, []);

  return (
    <View style={styles.container}>
      <Text>Splash Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },

});

export default SplashScreen;
