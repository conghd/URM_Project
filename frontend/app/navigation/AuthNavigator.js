import {createStackNavigator, TransitionPresets} from "@react-navigation/stack";
import SignInScreen from "../screens/auth/SignInScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import ResetPassword from "../screens/auth/ResetPassword";
import ForgotPassword from "../screens/auth/ForgotPassword";
import ActivationScreen from "../screens/auth/ActivationScreen";
import ActivationComplete from "../screens/auth/ActivationComplete";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";

const Stack = createStackNavigator();
const options1 = {
  headerShown: false,
  ...TransitionPresets.DefaultTransition,
};
const AuthNavigator = () => {
  const {settings} = useSelector((state) => state.settings);

  useEffect(() => {
    console.log("AuthNavigator::useEffect()");
  }, []);

  useEffect(() => {
    console.log("AuthNavigator::useEffect, isNewAccount: " + settings);
  }, [settings]);

  return (
    <Stack.Navigator>
      { (settings && settings.isNewAccount ) ? (
        <>
          <Stack.Screen name="SignUp" component={SignUpScreen}
            options={options1} />
          <Stack.Screen name="SignIn" component={SignInScreen}
            options={options1} />
        </>
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen}
            options={options1} />
          <Stack.Screen name="SignUp" component={SignUpScreen}
            options={options1} />
        </>
      )}
      <Stack.Screen name="ResetPassword" component={ResetPassword}
        options={options1} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword}
        options={options1} />
      <Stack.Screen name="Activation" component={ActivationScreen}
        options={options1} />
      <Stack.Screen name="ActivationComplete" component={ActivationComplete}
        options={options1} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
