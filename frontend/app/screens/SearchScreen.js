import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';


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

const SearchScreen = () => {
    const [key, onChangeKey] = useState("user.token");
    const [value, onChangeValue] = useState("No values");

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
