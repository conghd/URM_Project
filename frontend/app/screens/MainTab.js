import React, {useEffect} from "react";
import {createMaterialBottomTabNavigator}
  from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons
  from "react-native-vector-icons/MaterialCommunityIcons";
import ProfileStack from "./ProfileStack";
import BookmarkStack from "./BookmarkStack";
import HomeStack from "./HomeStack";
import MessengerStack from "./MessengerStack";

const Tab = createMaterialBottomTabNavigator();
const MainTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      // activeColor="#004e2e"
      // inactiveColor="#363636"
      // barStyle={{ backgroundColor: '#FFFFFF' }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
          headerBackTitle: "",
          headerTitle: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
          headerTitleAlign: "center",
        }}
      />
      {/**
        <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{
                headerTitle: "Search",
                tabBarLabel: "Search",
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="magnify"
                    color={color} size={26} />
                ),
            }}
        />
         */}
      <Tab.Screen
        name="BookmarkStack"
        component={BookmarkStack}
        options={{
          headerTitle: "Bookmark Posts",
          tabBarLabel: "Bookmark",
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="bookmark" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="MessengerStack"
        component={MessengerStack}
        options={{
          headerTitle: "Messenger",
          tabBarLabel: "Messenger",
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="chat"
              color={color} size={26} />
          ),
        }}
      />
      {/**
        */ }
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
