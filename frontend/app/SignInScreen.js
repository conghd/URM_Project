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


const SignInScreen = ({ navigation, route }) => {
    const [key, onChangeKey] = useState("user.token");
    const [value, onChangeValue] = useState("No values");
    const { setUserToken } = route.params;

    const handleSignIn = async (event) => {
        setUserToken("Hello");
        console.log("Handle Sign In");
    }
    return (
        <View style={styles.container}>
            <Text>Sign In</Text>
            <Button title="Sign In" onPress={() => handleSignIn() }/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

});

export default SignInScreen;