import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button } from 'react-native';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import SplashScreen from "./auth/SplashScreen";
import { load } from '../services/auth/authSlice';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SearchScreen from './listing/SearchScreen';
import ProductCreationScreen from './listing/CreationScreen';
import ActivationComplete from './auth/ActivationComplete';
import IntroScreen from './IntroScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import AuthNavigator from '../navigation/AuthNavigator';
import IntroNavigator from '../navigation/IntroNavigator';
import AppNavigator from '../navigation/AppNavigator';
import HomeStack from './HomeStack';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#004e2e',
    secondary: '#ffc82e',
    tertiary: '#eaaa00',
  },
};

//const Stack = createStackNavigator();
//const Stack = createNativeStackNavigator();
//const Tab = createMaterialBottomTabNavigator();

export default function ScreenManager() {
  const { user } = useSelector((state) => state.auth);
  const { settings } = useSelector((state) => state.settings) 

  useEffect(() => {
    console.log("ScreenManager::useEffect()");
    //console.log("ScreenManager::useEffect(), isFirstTime = " + isFirstTime);
    console.log("ScreenManager::useEffect(), user = " + JSON.stringify(user));
  }, []);

  return (
      <PaperProvider>
      {/* <PaperProvider theme={theme}>
      */}
        <NavigationContainer>
          { (settings && settings.isFirstTime) ?
            (<IntroNavigator />)
            :
            (
              (user === null || user === {}) ?
              (<AuthNavigator />)
              :
              (<AppNavigator/>)
            ) 
          }
        </NavigationContainer>
      </PaperProvider>
  );
}