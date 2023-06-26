import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, Button } from 'react-native';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import SplashScreen from "./SplashScreen";
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import ResetPassword from './ResetPassword';
import DetailsScreen from './DetailsScreen';
import MainScreen from './MainScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import BookmarkScreen from './BookmarkScreen';
import ActivationScreen from './screens/ActivationScreen';
import {useSelector, useDispatch } from 'react-redux';
import { load } from '../services/auth/authSlice';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SearchScreen from './SearchScreen';

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
const Tab = createMaterialBottomTabNavigator();

export default function ScreenManager() {
  const [userToken, setUserToken] = useState(null);
  const dispatch = useDispatch();
  const {user, isSuccess, isLoading, isError, message, loadState} = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("ScreenManager::useEffect()");
    //getUserToken();
    dispatch(load());
  }, []);

  if (loadState.isLoading) {
    return <SplashScreen />
  }

  return (
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Home"
            
            >
            { user == null ? (
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
                <Stack.Screen name="Main" component={MainScreen}
                  options={{ title: "UR Marketplace",
                  headerShown:false,
                  headerTintColor: 'white',
                  headerStyle: { backgroundColor: '#004e2e' },
                  ...TransitionPresets.ModalFadeTransition}} 
                  />
                <Stack.Screen name="Details" component={DetailsScreen} />
                <Stack.Screen name="Search" component={SearchScreen} />
              </>
            ) }
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
  );
}