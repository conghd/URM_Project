import React, {useEffect} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CreationScreen from "../screens/listing/CreationScreen";
import DetailsScreen from "../screens/listing/DetailsScreen";
import ScannerScreen from "../screens/listing/ScannerScreen";
import SearchScreen from "../screens/listing/SearchScreen";
import MainTab from "../screens/MainTab";
import {Button} from "react-native-paper";
// import SearchStack from "../screens/SearchStack";

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  useEffect(() => {

  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTab" component={MainTab}
        options={({navigation, route}) => (
          {
            // title: "MainTab",
            headerShown: false,
          })}
      />

      <Stack.Screen name="CreationScreen" component={CreationScreen}
        options={({navigation, route}) => (
          {
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

export default AppNavigator;
