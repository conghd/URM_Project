import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ChatScreen from "./ChatScreen";
// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();
const MessengerStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Messenger" component={ChatScreen}
        options={{
          title: "Messenger",
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default MessengerStack;
