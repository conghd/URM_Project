import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { HelperText, Button, TextInput, Text, ActivityIndicator } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
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

    const [formData, setFormData] = useState({ email: "", password: ""});
    const {email, password} = formData;
    const [errors, setErrors] = useState({email: "", password: "", other: ""});
    //const { setUserToken } = route.params;

    const resetForm = () => {
        setFormData((prev) => {return {email: "", password: ""}});
        setErrors({email: "", password: ""});
    }
    const handleTextChange = (value) => {
        console.log(value);
        /*
        return setFormData((prev) => {
          return {...prev, ...value}
        });
        */
      }

      React.useEffect(() => {
        console.log("SignIn::useEffect()");

      }, []);

      React.useEffect(() => {

      }, [isLoading]);

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
        dispatch(login({email: `${email}@uregina.ca`, password: password}));
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
    subHorizontal: {
        flex: 1,
        marginTop: 10,
        flexDirection: "row",
    },
    input: {
        flex: 1,
    },
    input2: {
        flex: 1,
    },
    link: {
        textDecorationColor: "red",
        textDecorationStyle: "solid",
    },
    linkText: {
        color: "#176fdb",
        fontSize: 16,
    },
    
      errorText: {
        flex: 1,
        paddingLeft: 40,
        fontSize: 12,
        color: 'red',
      },

});

export default SignInScreen;