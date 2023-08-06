import * as React from 'react';
import { View, StyleSheet, Keyboard} from 'react-native';
import { HelperText, Button, TextInput, Text, ActivityIndicator, Snackbar, Divider } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState, useRef } from 'react';
import { Link } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { login, resetLogin } from '../../services/auth/authSlice'
import { theme } from '../../constants';
import EmailInput from '../../components/EmailInput';
import PasswordInput from '../../components/PasswordInput';
import AuthFooter from '../../components/AuthFooter';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const SignInScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  const {isLoading, isError, isSuccess, message } = useSelector((state) => state.auth.loginState);
  const [loginData, setLoginData] = useState({email: "", password: ""});
  const refInputs = [useRef(), useRef()];

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

    const handleSubmitEditing = (index) => {
      console.log("handleSubmitEditing: " + index)
      if (index < 1) {
        refInputs[index + 1].current.focus();
      } else {
        Keyboard.dismiss();
      }
    };
    useEffect(() => {
      const unsubscrible = navigation.addListener("focus", () => {
        console.log("SignInScreen::useEffect()")
        setErrors((state) => { return {...state, other: ""}});
        //setVisible(false);
      });

      return unsubscrible;
    }, [navigation]);

    useEffect(() => {
      console.log("SignIn::useEffect()");
      console.log("loginData: " + JSON.stringify(loginData));
      console.log("error: " + JSON.stringify(errors));

    }, [loginData, errors]);

    useEffect(() => {
      if (isError) {
        setErrors((state) => { return {...state, other: message }})
      }

    }, [message])
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
      if (loginData.email == "" || loginData.password == "" ||
        errors.email!= "" || errors.password != "" ) {
        return;
      }

      dispatch(login(loginData));
    }

  return (
    <View style={theme.STYLE.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
      <View style={theme.STYLE.header}>
        <Text style={theme.STYLE.headerText}>URM</Text>
      </View>
      <View style={[theme.STYLE.sub, styles.title]}>
          <Text variant="titleLarge">Log In</Text>
      </View>
      <View style={theme.STYLE.sub}>
        <EmailInput 
            handleTextChange={handleTextChange}
            handleSubmitEditing={handleSubmitEditing}
            index={0}
            ref={refInputs[0]}
        />
      </View>

      {/** Comment */}
      <View style={theme.STYLE.sub}>
        <PasswordInput
          handleTextChange={handleTextChange}
            handleSubmitEditing={handleSubmitEditing}
            index={1}
            ref={refInputs[1]}
        />
      </View>

      

      {/** Forgot password */}
      <View style={[theme.STYLE.sub, styles.forgot_password] } >
            <Button 
              mode='text'
              onPress={() => { navigation.navigate("ForgotPassword", {email: loginData.email } )}}
            >Forgot password?</Button>
      </View>
      
      { errors.other != "" && 
      <View style={theme.STYLE.sub}>
          <HelperText
            style={{paddingLeft: 0}}
            type="error" visible={errors.other != ""}>
            {errors.other}
          </HelperText>
      </View>
      }

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
      <Divider style={styles.divider} />
      <View style={{...theme.STYLE.sub, justifyContent: 'center'}}>
          <Text  variant='bodyMedium'>
              Don't have an account? 
          </Text>

      </View>
      <View style={{...theme.STYLE.sub, marginTop: 10}}>
        <Button
        style={theme.STYLE.button}
        mode='outlined'
        onPress={() => { navigation.navigate("SignUp")}}
        >Register</Button>
      </View>
      </KeyboardAwareScrollView>
      <AuthFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    justifyContent: "center",
  },
  divider: {
    marginTop: 30,
  },
  forgot_password: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: "flex-end",
  },

});

export default SignInScreen;