import React, {useEffect} from "react";
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
            headerRight: () => (
              <>
                <IconButton
                  size={20}
                  backgroundColor="lightgrey"
                  icon="magnify"
                  onPress={() => {
                    navigation.navigate("SearchScreen", {});
                  }}
                />
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
