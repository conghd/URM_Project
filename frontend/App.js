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
    isLoading: false,
    isSignOut: false,
    userToken: null,
  };

  const getUserToken = async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    try {
      await sleep(8000);
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

  if (state.isLoading) {
    return <SplashScreen />
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          { userToken == null ? (
            <>
              <Stack.Screen name="SignIn" component={SignInScreen} 
                initialParams={{ setUserToken}}
                options={{
                  headerShown:false,
                  ...TransitionPresets.DefaultTransition
                }} 
                />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
              <Stack.Screen name="Activation" component={ActivationScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Home" component={HomeScreen}
                initialParams={{ setUserToken }}
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});