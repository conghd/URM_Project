import React, {useState, useEffect} from "react";
import {Text, View, StyleSheet, TextInput, Button} from "react-native";

const MessengerScreen = () => {
  useEffect(() => {
    console.log("Messenger::useEffect()");
  }, []);

  return (
    <View style={styles.container}>
      <Text>Messenger Screen</Text>
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

export default MessengerScreen;
