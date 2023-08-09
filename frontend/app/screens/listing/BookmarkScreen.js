import * as React from "react";
import {Text, View, StyleSheet, TextInput, Button} from "react-native";
import * as SecureStore from "expo-secure-store";
import {useState, useEffect} from "react";

const BookmarkScreen = () => {
  const [key, onChangeKey] = useState("user.token");
  const [value, onChangeValue] = useState("No values");

  useEffect(() => {
    console.log("SplashScreen::useEffect()");
  }, []);

  return (
    <View style={styles.container}>
      <Text>Bookmark Screen</Text>
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

export default BookmarkScreen;
