import React, {useLayoutEffect} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SearchScreen from "./listing/SearchScreen";

// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();
const SearchStack = ({navigation, route}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Search Stack",
      placeholder: "Search",
    });
  });
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchScreen" component={SearchScreen}
        options={{
          title: "Search",
          // headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;
