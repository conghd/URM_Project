import "react-native-gesture-handler";
import React, {useEffect, useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {MD3LightTheme as DefaultTheme, PaperProvider} from "react-native-paper";
import {useDispatch, useSelector} from "react-redux";
import AuthNavigator from "../navigation/AuthNavigator";
import IntroNavigator from "../navigation/IntroNavigator";
import AppNavigator from "../navigation/AppNavigator";
import {SafeAreaProvider} from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import {toastConfig} from "./ToastConfig";
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // background: "#ffffff",
    // surfaceVariant: "#ffffff",
    // primary: "#004e2e",
    // secondary: "#ffc82e",
    // tertiary: "#eaaa00",
  },
};

// const Stack = createStackNavigator();
// const Stack = createNativeStackNavigator();
// const Tab = createMaterialBottomTabNavigator();


const ScreenManager = () => {
  const {user} = useSelector((state) => state.auth);
  const {settings} = useSelector((state) => state.settings);

  useEffect(() => {
    console.log("ScreenManager::useEffect(), user = " + JSON.stringify(user));
  }, []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <SafeAreaProvider>
          { (settings && settings.isFirstTime) ?
            (<IntroNavigator />):
            (
              (user === null || user === {}) ?
              (<AuthNavigator />) :
              (<AppNavigator/>)
            )
          }
        </SafeAreaProvider>
      </NavigationContainer>

      <Toast config={toastConfig}/>
    </PaperProvider>
  );
};

export default ScreenManager;
