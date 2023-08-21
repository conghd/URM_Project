import React, {useEffect} from "react";
import {Pressable} from "react-native";
import {Feather} from "@expo/vector-icons";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Text, IconButton, Button} from "react-native-paper";
import HomeScreen from "./HomeScreen";

// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen}
        options={({navigation, route}) => (
          {
            headerBackTitle: "",
            headerRight: () => (
              <>
                {/**
                <IconButton
                  size={20}
                  backgroundColor="lightgrey"
                  icon="magnify"
                  onPress={() => {
                    navigation.navigate("SearchScreen", {});
                  }}
                />
                <Pressable onPress={() => {
                  socket.emit("createRoom", "Hoang Duc Cong's room");
                }}
                >
                  <Feather name='edit' size={24} color='green' />
                </Pressable>
*/}
                <IconButton
                  size={20}
                  backgroundColor="lightgrey"
                  icon="plus"
                  onPress={() => {
                    navigation.navigate("CreationScreen", {});
                    // alert("Camera")
                  }}
                />
              </>
            ),

          })}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
