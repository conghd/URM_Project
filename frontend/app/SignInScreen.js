import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, TextInput  } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { Link } from '@react-navigation/native';


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
    //const { setUserToken } = route.params;

    const handleSignIn = async (event) => {
        //setUserToken("Hello");
        console.log("Handle Sign In");
    }
    return (
        <View style={styles.container}>
            <View style={styles.sub}>
                <Text variant="titleLarge">Sign In</Text>
            </View>
            <View style={styles.sub}>
                <Text variant="bodyMedium">Please use your school email</Text>
            </View>
            <View style={styles.sub}>
                    <TextInput style={styles.input}
                        mode="outlined"
                        label="Username"
                        placeholder="Username"
                        right={<TextInput.Affix text="@uregina.ca" />}
                    />
            </View>

            <View style={styles.sub}>
                <TextInput
                    style={styles.input}
                    mode="outlined"
                    label="Password"
                    placeholder="Password"
                    secureTextEntry
                    right={<TextInput.Icon icon="eye" />}
                    />
            </View>
            <View style={styles.sub}>
                <Button icon="camera" mode="contained" onPress={() => handleSignIn() }>
                    Sign In
                </Button>
            </View>
            <View style={styles.sub}>
                <View style={styles.half} >
                    <Link
                        style={styles.link}
                        to={{ screen: 'ResetPassword'}}>Forgot Password</Link>
                </View>
                <View
                    style={{...styles.half, justifyContent: "flex-end", marginRight: 50}}
                    >
                    <Link style={styles.link}
                        to={{ screen: 'SignUp'}} >Sign Up</Link>
                </View>
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
    sub: {
        marginTop: 10,
        flexDirection: "row",
    },
    half: {
        alignItems: "center",
        height: 60,
        flex: 1,
        flexDirection: "row",
        marginLeft: 50,
    },
    input: {
        flex: 0.75,
    },
    input2: {
        flex: 0.75,
    },
    link: {
        textDecorationColor: "red",
        textDecorationStyle: "solid",
        textDecorationLine: "underline",
    }

});

export default SignInScreen;