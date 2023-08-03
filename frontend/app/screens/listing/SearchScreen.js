import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';


async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);

    if (result) {
        alert("Here's your value \n" + result);
    } else {
        alert("No values stored under that key.");
    }
}

const SearchScreen = ({navigation, route}) => {
    const [key, onChangeKey] = useState("user.token");
    const [value, onChangeValue] = useState("No values");
    const nav = useNavigation();

    useEffect(() => {
        console.log("SearchScreen::useEffect()");

    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "TEST",
            
            headerSearchBarOptions: {
            },

            headerSearchBarOptions: {
                placeholder: "Search",
                
            }
        });

    }, []);
    return (
        <View style={styles.container}>
            <Text>Search Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },

});

export default SearchScreen;
