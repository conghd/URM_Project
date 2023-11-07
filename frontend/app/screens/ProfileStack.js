import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ProfileScreen from "./account/ProfileScreen";

// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();
const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen}
        options={{
          title: "My Profile",
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
