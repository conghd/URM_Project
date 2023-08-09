import React, {useEffect} from "react";
import HomeScreen from "./HomeScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Button} from "react-native";
import {IconButton} from "react-native-paper";
import CreationScreen from "./listing/CreationScreen";
import DetailsScreen from "./listing/DetailsScreen";
import ScannerScreen from "./listing/ScannerScreen";
import SearchScreen from "./listing/SearchScreen";

// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen}
        options={({navigation, route}) => (
          {
            title: "Home",
            headerShown: true,
            headerBackTitle: "Test",
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
                  onPress={() => alert("This is a button")}
                />
                <Button
                  onPress={() => alert("This is a button")}
                  title="Info"
                />
              </>
            ),

          })}
      />

      <Stack.Screen name="CreationScreen" component={CreationScreen}
        options={({navigation, route}) => (
          {
            title: "New Listing",
          }
        )}
      />

      <Stack.Screen name="DetailsScreen" component={DetailsScreen}
        options={({navigation, route}) => (
          {
            title: "Details",
          }
        )}
      />
      <Stack.Screen name="ScannerScreen" component={ScannerScreen}
        options={({navigation, route}) => (
          {
            presentation: "modal",
            title: "ISBN Scanner",
            headerShown: true,
          }
        )}
      />

      <Stack.Screen name="SearchScreen" component={SearchScreen}
        options={({navigation, route}) => (
          {
            title: "Search",
            // headerShown: false,
          }
        )}
      />

    </Stack.Navigator>
  );
};

export default HomeStack;
