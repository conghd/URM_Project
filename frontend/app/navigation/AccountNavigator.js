import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import IntroScreen from "../screens/IntroScreen";
import SignInScreen from "../screens/auth/SignInScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import ResetPassword from "../screens/auth/ResetPassword";
import ActivationScreen from "../screens/auth/ActivationScreen";
import ActivationComplete from "../screens/auth/ActivationComplete";

const Stack = createStackNavigator();
const options1 = {
  headerShown:false,
  ...TransitionPresets.DefaultTransition
}
const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Intro" component={IntroScreen} options={options1} />
    <Stack.Screen name="SignIn" component={SignInScreen} options={options1} />
    <Stack.Screen name="SignUp" component={SignUpScreen} options={options1} />
    <Stack.Screen name="ResetPassword" component={ResetPassword} options={options1} />
    <Stack.Screen name="Activation" component={ActivationScreen} options={options1} />
    <Stack.Screen name="ActivationComplete" component={ActivationComplete} options={options1} />
  </Stack.Navigator>
);

export default AccountNavigator;
