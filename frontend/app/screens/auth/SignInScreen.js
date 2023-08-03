import * as React from 'react';
import { View, StyleSheet, Keyboard} from 'react-native';
import { HelperText, Button, TextInput, Text, ActivityIndicator, Snackbar } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { Link } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { login, resetLogin } from '../../services/auth/authSlice'
import { theme } from '../../constants';
import EmailInput from '../../components/EmailInput';
import PasswordInput from '../../components/PasswordInput';
import AuthFooter from '../../components/AuthFooter';


const SignInScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  const {isLoading, isError, isSuccess, message } = useSelector((state) => state.auth.loginState);
  const [loginData, setLoginData] = useState({email: "", password: ""});

  const [errors, setErrors] = useState({email: "", password: "", other: ""});

  const handleTextChange = (value) => {
      console.log(value);
      setLoginData((prev) => {
        return {...prev, ...value.content}
      });

      setErrors((prev) => {
        return {...prev, ...value.error}
      });

      if (message) {
        console.log("ResetLogin");
        dispatch(resetLogin());
      }
    }

    useEffect(() => {
      console.log("SignIn::useEffect()");
      console.log("loginData: " + JSON.stringify(loginData));
      console.log("error: " + JSON.stringify(errors));

    }, [loginData, errors]);

    useEffect(() => {
      console.log("SignInScreen::useEffect, user = " + JSON.stringify(user));
      if (user != null && user.token != "") {
        if (user.activated == false) {
          navigation.replace("Activation", {verification: "activation"});
        }
      }

    }, [isLoading]);

    const handleSubmit = (e) => {
      //e.preventDefault();
      Keyboard.dismiss();
      if (errors.email!= "" || errors.password != "" ) {
        return;
      }

      dispatch(login(loginData));
    }

  return (
    <View style={theme.STYLE.container}>
      <View style={theme.STYLE.header}>
        <Text style={theme.STYLE.headerText}>URM</Text>
      </View>
      <View style={[theme.STYLE.sub, styles.title]}>
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

      { message != "" && 
      <View style={theme.STYLE.sub}>
        <View style={theme.STYLE.errorText} >
          <HelperText type="error" visible={message != ""}>
            {message}
          </HelperText>
        </View>
      </View>
      }
      {/** 
      <ActivityIndicator animating={isLoading} />
      */}
      {/** Sign In button */}
      <View style={theme.STYLE.sub}>
        <Button 
          loading={isLoading}
          style={theme.STYLE.button}
          icon="login"
          mode="contained"
          onPress={() => handleSubmit() }
          >
          Sign In
        </Button>
      </View>
      {/* These are the links to others  */}
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
  title: {
    justifyContent: "center",
  }
});

export default SignInScreen;