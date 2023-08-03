import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import IntroScreen from "../screens/IntroScreen";

const Stack = createStackNavigator();
const options1 = {
  headerShown:false,
  ...TransitionPresets.DefaultTransition
}
const IntroNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Intro" component={IntroScreen} options={options1} />
  </Stack.Navigator>
);

export default IntroNavigator;