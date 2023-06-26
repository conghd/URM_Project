import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './HomeScreen'
import ProfileScreen from './ProfileScreen'
import MessengerScreen from './MessengerScreen';
import BookmarkScreen from './BookmarkScreen';

const Tab = createMaterialBottomTabNavigator();

const MainScreen = ({ navigation }) => {
    return (
        <Tab.Navigator
            initialRouteName="Home" 
            activeColor="#004e2e"
            inactiveColor="#363636"
            barStyle={{ backgroundColor: '#FFFFFF' }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: true,
                    headerTitle: "UR Market",
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                    headerTitleAlign: "center",
                }}
            />
            <Tab.Screen
                name="BookmarkScreen"
                component={BookmarkScreen}
                options={{
                    headerTitle: "Bookmark Posts",
                    tabBarLabel: "Bookmark",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="bookmark" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Messenger"
                component={MessengerScreen}
                options={{
                    headerTitle: "Messenger",
                    tabBarLabel: "Messenger",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="chat" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default MainScreen;
