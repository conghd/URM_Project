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
import { store } from './app/store';
import { Provider } from 'react-redux';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: "yellow",
  },
};

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  let state = {
    isLoading: true,
    isSignOut: false,
    userToken: null,
  };

  const getUserToken = async () => {
    console.log("getUserToken()");
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    try {
      await sleep(3000);
      //const token = "BBBBBBBBBB";
      const token = null;
      setUserToken(token);
    } finally {
      setIsLoading(false);
    }

  }

  useEffect(() => {
    getUserToken();
  }, []);

  if (isLoading) {
    return <SplashScreen />
  }

  return (
    <Provider store={store}>
      <PaperProvider>
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
    </Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});