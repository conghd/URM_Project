import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MessagingListScreen from "./MessagingListScreen";
// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();
const MessengerStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Messenger" component={MessagingListScreen}
        options={{
          title: "Messenger",
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default MessengerStack;
