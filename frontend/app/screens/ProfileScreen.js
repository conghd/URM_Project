import * as React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useState, useEffect } from 'react';
import { Button, ActivityIndicator } from 'react-native-paper';
import { logout } from '../services/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';

const ProfileScreen = () => {
    const [key, onChangeKey] = useState("user.token");
    const [value, onChangeValue] = useState("No values");
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.auth.logoutState);

    useEffect(() => {
        console.log("SplashScreen::useEffect()");
    }, []);

    const handleSignOut= (e) => {
        console.log("ProfileScreen::handleSignOut");
        dispatch(logout());
    }

    return (
        <View style={styles.container}>
            <Text>Profile Screen</Text>
        <ActivityIndicator 
            style={styles.loading}
            animating={isLoading} />
            <View style={styles.sub}>
                <Button 
                    icon="camera"
                    mode="contained"
                    onPress={() => handleSignOut() }
                    >
                    Sign Out
                </Button>
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

    loading: {
        marginTop: 10,
        marginBottom: 10,
    }

});

export default ProfileScreen;