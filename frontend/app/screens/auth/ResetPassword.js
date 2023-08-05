import * as React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { useState, useRef, useEffect } from 'react';
import { theme } from '../../constants';


const ResetPassword = ({navigation, route}) => {

    useEffect(() => {
        console.log("ResetPassword::useEffect()[]")

    }, [])

    return (
        <View style={styles.container}>
            <Text>Reset Password</Text>
            <View style={theme.STYLE.sub}>
                <Button mode='outlined'
                onPress={() => { navigation.navigate("SignIn")}}
                >Log In</Button>
            </View>
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

export default ResetPassword;