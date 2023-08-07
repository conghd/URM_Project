import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MessengerScreen from "./messenger/MessengerScreen";

//const Stack = createStackNavigator();
const Stack = createNativeStackNavigator()
const MessengerStack = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Messenger" component={MessengerScreen} 
        options={{
          title: 'Messenger',
          headerShown:true,
        }}
        />
    </Stack.Navigator>
  )
}

export default MessengerStack;
