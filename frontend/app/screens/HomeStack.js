import { useEffect } from "react";
import { useSelector } from "react-redux";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native";
import { IconButton } from "react-native-paper";
import CreationScreen from "./listing/CreationScreen";

//const Stack = createStackNavigator();
const Stack = createNativeStackNavigator()
const HomeStack = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} 
        options={({ navigation, route }) => (
          {
          title: 'Home',
          headerShown:true,
          headerBackTitle:"Test",
          /*
          headerLeft: () => (
            <Button
              onPress={() => alert('This is a button')}
              title="Info"
              color="darkgrey"
            />
          ),
          */
          headerRight: () => (
            <>
            <IconButton
              icon="camera"
              onPress={() => alert("Camera")}

            />
            <IconButton
              icon="magnify"
              onPress={() => alert('This is a button')}
            />
            <Button
              onPress={() => alert('This is a button')}
              title="Info"
            />
            </>
          ),

        })}

        />

      <Stack.Screen name="Creation" component={CreationScreen}
        options={({ navigation, route }) => (
          {
            title: "New Listing",
          }
        )}
      />
    </Stack.Navigator>
  )
}

export default HomeStack;
