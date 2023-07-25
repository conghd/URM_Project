import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button } from 'react-native';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import SplashScreen from "./SplashScreen";
import SignInScreen from './auth/SignInScreen';
import SignUpScreen from './auth/SignUpScreen';
import ResetPassword from './auth/ResetPassword';
import DetailsScreen from './DetailsScreen';
import MainScreen from './MainScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import BookmarkScreen from './BookmarkScreen';
import ActivationScreen from './auth/ActivationScreen';
import {useSelector, useDispatch } from 'react-redux';
import { load } from '../services/auth/authSlice';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SearchScreen from './SearchScreen';
import ProductCreationScreen from './ProductCreationScreen';
import ProductDetailsScreen from './ProductDetailsScreen';
import ActivationComplete from './auth/ActivationComplete';
import IntroScreen from './IntroScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function ScreenManager() {
  const [userToken, setUserToken] = useState(null);
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const {user, isSuccess, isError, message, loadState} = useSelector((state) => state.auth);

  const getSettings = async() => {
    try {
      const nextSettings = await AsyncStorage.getItem("settings");
      setSettings(nextSettings);
    } catch (e) {
    }

    setIsLoading(false);
  }

  const storeSettings = async (settings) => {
    try {
      await AsyncStorage.setItem("settings", JSON.stringify(settings));
    } catch (e) {
    }
  };

  useEffect(() => {
    console.log("ScreenManager::useEffect()");
    //getUserToken();
    dispatch(load());
  }, []);

  if (loadState.isLoading || isLoading) {
    return <SplashScreen />
  }

  return (
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Home"
            
            >
            { (user == null || user.activated == false) ? (
              <Stack.Group>
                <Stack.Screen name="Intro" component={IntroScreen} 
                  options={{
                    headerShown:false,
                    ...TransitionPresets.DefaultTransition
                  }} 
                  />
                <Stack.Screen name="SignIn" component={SignInScreen} 
                  options={{
                    headerShown:false,
                    ...TransitionPresets.DefaultTransition
                  }} 
                  />
                <Stack.Screen name="SignUp" component={SignUpScreen}
                  options={{
                    headerShown:false,
                    ...TransitionPresets.DefaultTransition
                  }} 
                />

                <Stack.Screen name="ResetPassword" component={ResetPassword}
                  options={{
                    headerShown:false,
                    ...TransitionPresets.DefaultTransition
                  }} 

                  />
                <Stack.Screen name="Activation" component={ActivationScreen}
                  options={{
                    headerShown:false,
                    ...TransitionPresets.DefaultTransition
                  }} 
                />
                <Stack.Screen name="ActivationComplete" component={ActivationComplete}
                  options={{
                    headerShown:false,
                    ...TransitionPresets.DefaultTransition
                  }} 
                />
              </Stack.Group>
            ) : (
              <Stack.Group>
                <Stack.Screen name="Main" component={MainScreen}
                  options={{
                    //title: "UR Marketplace",
                    headerShown:false,
                    headerTintColor: 'white',
                    headerStyle: { backgroundColor: '#004e2e' },
                    ...TransitionPresets.ScaleFromCenterAndroid
                  }} 
                  />
                <Stack.Screen name="Details" component={DetailsScreen} />
                <Stack.Screen name="Search" component={SearchScreen} />
                <Stack.Screen name="ProductCreation" component={ProductCreationScreen}
                  options={{
                    headerTitle: "New Listing"
                  }
                  } />
                <Stack.Screen name="ProductDetails" component={ProductDetailsScreen}
                  options={{
                    headerTitle: ""
                  }}
                
                />
              </Stack.Group>
            ) }
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
  );
}