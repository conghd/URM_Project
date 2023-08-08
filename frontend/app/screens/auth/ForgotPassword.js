import * as React from 'react';
import { View, StyleSheet, Keyboard} from 'react-native';
import { HelperText, Button, TextInput, Text, ActivityIndicator, Snackbar, Divider } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, reset as resetForgotPassword } from '../../services/auth/authForgotPasswordSlice';
import { theme } from '../../constants';
import EmailInput from '../../components/EmailInput';
import AuthFooter from '../../components/AuthFooter';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StatusBar } from 'expo-status-bar';


const ForgotPassword = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { email } = route.params;
  const {isLoading, isError, isSuccess, message } = useSelector((state) => state.authForgotPassword);
  const [data, setData] = useState({email: email })
  const refInputs = [React.useRef()]

  const [errors, setErrors] = useState({email: "", other: ""})

  const handleTextChange = (value) => {
    console.log(value)
    setData((prev) => {
      return {...prev, ...value.content}
    });

    setErrors((prev) => {
      return {...prev, ...value.error}
    });

    if (message) {
      console.log("ResetLogin");
      dispatch(resetForgotPassword());
    }
  }

  useEffect(() => {
    console.log(`ForgotPassword::useEffect[navigation] - isLoading: ${isLoading}, isSuccess: ${isSuccess}, isError: ${isError}`)
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(resetForgotPassword());
      // The screen is focused
      // Call any action
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    console.log(`ForgotPassword::useEffect[] - isLoading: ${isLoading}, isSuccess: ${isSuccess}, isError: ${isError}`)
    //dispatch(resetForgotPassword());
  }, [])

  useEffect(() => {
    console.log(`ForgotPassword::useEffect - isLoading: ${isLoading}, isSuccess: ${isSuccess}, isError: ${isError}`)
  })

  /*
  useEffect(() => {
    console.log("ForgotPassword::useEffect()");
    console.log("ForgotPassword - data: " + JSON.stringify(data));
    console.log("ForgotPassword - error: " + JSON.stringify(errors));

  }, [data, errors]);
  */

  useEffect(() => {
    console.log("ForgotPassword::useEffect[isError] - " + isError)
    if (isError) {
      // Handle error
      setErrors((prev) => {
        return {...prev, other: message.message}
      });

      dispatch(resetForgotPassword())
    }

  }, [isError])

  useEffect(() => {
    console.log("ForgotPassword::useEffect[isLoading] - " + isLoading)

  }, [isLoading])

  useEffect(() => {
    console.log("ForgotPassword::useEffect[isSuccess] - " + isSuccess)
    if (isSuccess) {
      navigation.replace("Activation", {verification: "FORGOT_PASSWORD", email: message.email})

      dispatch(resetForgotPassword())
    }

  }, [isSuccess]);

  const handleSubmit = (e) => {
    //e.preventDefault();
    Keyboard.dismiss();
    if (errors.email!= "") {
      return;
    }

    dispatch(forgotPassword(data));
  }

  const handleSubmitEditing = (index) => {
    Keyboard.dismiss();
  }

  return (
    <View style={theme.STYLE.container}>
      <StatusBar />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
      <View style={theme.STYLE.header}>
        <Text style={theme.STYLE.headerText}>URM</Text>
      </View>
      <View style={[theme.STYLE.sub, styles.title]}>
          <Text variant="titleLarge">Forgot Password</Text>
      </View>
      <View style={theme.STYLE.sub}>
        <Text variant='bodyMedium'>Enter your school email address</Text>
      </View>
      <View style={[theme.STYLE.sub, styles.email]}>
        <EmailInput 
          email={email}
          handleTextChange={handleTextChange}
          handleSubmitEditing={handleSubmitEditing}
          index={0}
          ref={refInputs[0]}
        />
      </View>

      { errors.other != "" && 
      <View style={[theme.STYLE.sub, styles.error]}>
          <HelperText
            style={{paddingLeft: 0}}
            type="error" visible={errors.other!= ""}>
            {errors.other}
          </HelperText>
      </View>
      }
      {/** 
      <ActivityIndicator animating={isLoading} />
      */}
      {/** Sign In button */}
      <View style={{...theme.STYLE.sub, marginTop: 30}}>
        <Button 
          loading={isLoading}
          style={theme.STYLE.button}
          icon="send"
          mode="contained"
          onPress={() => handleSubmit() }
          >
          Continue
        </Button>
      </View>
      <Divider style={theme.STYLE.divider} />
      {/* These are the links to others  */}
      <View style={[theme.STYLE.sub, styles.extra]}>
        <Text  variant='bodyMedium'>Or</Text>
      </View>
      <View style={{...theme.STYLE.sub, marginTop: 10}}>
        <Button
          style={theme.STYLE.button}
          mode='outlined'
          onPress={() => { navigation.navigate("SignIn")}}
        >Back</Button>
      </View>
      <AuthFooter />
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    justifyContent: "center",
  },
  error: {
    marginTop: 0,
  },
  extra: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  email: {
    marginTop: 5,
  }
});

export default ForgotPassword;