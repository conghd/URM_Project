import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, Button } from 'react-native';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import SplashScreen from "./app/SplashScreen";
import SignInScreen from './app/SignInScreen';
import SignUpScreen from './app/SignUpScreen';
import ResetPassword from './app/ResetPassword';
import DetailsScreen from './app/DetailsScreen';
import HomeScreen from './app/HomeScreen';
import ActivationScreen from './app/ActivationScreen';
import {useSelector, useDispatch } from 'react-redux';
import { load } from './services/auth/authSlice';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#004e2e',
    secondary: '#ffc82e',
    tertiary: '#eaaa00',
  },
};

const Stack = createStackNavigator();

export default function ScreenManager() {
  const [userToken, setUserToken] = useState(null);
  const dispatch = useDispatch();
  const {users, isSuccess, isLoading, isError, message} = useSelector((state) => state.auth);

  const getUserToken = async () => {
    console.log("getUserToken()");
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    try {
      await sleep(1000);
      //const token = "BBBBBBBBBB";
      const token = null;
      setUserToken(token);
    } finally {
      setIsLoading(false);
    }

  }

  useEffect(() => {
    console.log("ScreenManager::useEffect()");
    //getUserToken();
    dispatch(load());
  }, []);

  if (isLoading) {
    return <SplashScreen />
  }

  return (
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            { userToken == null ? (
              <>
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
              </>
            ) : (
              <>
                <Stack.Screen name="Home" component={HomeScreen}
                  options={{ title: "ABC",
                  ...TransitionPresets.ScaleFromCenterAndroid }} 
                  />
                <Stack.Screen name="Details" component={DetailsScreen} />
              </>
            ) }
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
  );
}