import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { HelperText, Button, TextInput, Text, ActivityIndicator } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { Link } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../services/auth/authSlice'
import { theme } from '../constants';
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import AuthFooter from '../components/AuthFooter';


const SignInScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const {users, isSuccess, isError } = useSelector((state) => state.auth);
    const {isLoading, message } = useSelector((state) => state.auth.loginState);
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({email: "", password: "", other: ""});
    //const { setUserToken } = route.params;

    const handleTextChange = (value) => {
        console.log(value);
        /*
        return setFormData((prev) => {
          return {...prev, ...value}
        });
        */
      }

      useEffect(() => {
        console.log("SignIn::useEffect()");

      }, []);

      useEffect(() => {

      }, [isLoading]);

      useEffect(() => {
        const unsubscrible = navigation.addListener("focus", () => {
          console.log("RESETTING");
          setUserId("");

        });

        return unsubscrible;
      }, [navigation]);

      React.useEffect
      const handleSubmit = (e) => {
        //e.preventDefault();
        let emailMsg = validateEmail();
        let pwMsg = validatePassword();
        setErrors((prev) => { return {email: emailMsg, password: pwMsg}; });
        if (errors.email != "" || errors.password != "" ) {
          return;
        }

        //dispatch(reset());
        //setAnimating(true);
        dispatch(login({email: `${userId}@uregina.ca`, password: password}));
      }

    return (
        <View style={theme.STYLE.container}>
            <View style={theme.STYLE.header}>
              <Text style={theme.STYLE.headerText}>URM</Text>
            </View>
            <View style={theme.STYLE.sub}>
                <Text variant="titleLarge">Sign In</Text>
            </View>
            <View style={theme.STYLE.sub}>
              <EmailInput 
                  handleTextChange={handleTextChange}
              />
            </View>

            {/** Comment */}
            <View style={theme.STYLE.sub}>
              <PasswordInput
                handleTextChange={handleTextChange}
              />
            </View>

            <View style={theme.STYLE.sub}>
              <HelperText type="error" visible={message != ""}>
                {message}
              </HelperText>
            </View>

            <ActivityIndicator animating={isLoading} />

            {/** Sign In button */}
            <View style={theme.STYLE.sub}>
                <Button 
                    //icon="camera"
                    mode="contained"
                    onPress={() => handleSubmit() }
                    >
                    Sign In
                </Button>
            </View>
            {/* This is the links to others  */}
            <View style={theme.STYLE.sub}>
                <View style={theme.STYLE.leftHalf} >
                    <Button mode='text'
                      onPress={() => { navigation.navigate("ResetPassword")}}
                      >Reset Password</Button>
                </View>
                <View
                    style={theme.STYLE.rightHalf}
                    >
                      <Button mode='text'
                      onPress={() => { navigation.navigate("SignUp")}}
                      >Sign Up</Button>
                </View>
            </View>
            <AuthFooter />

        </View>
    );
}

const styles = StyleSheet.create({
});

export default SignInScreen;