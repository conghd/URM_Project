import * as React from "react";
import {View, StyleSheet, Keyboard} from "react-native";
import {HelperText, Button, TextInput, Text, ActivityIndicator, Snackbar, Divider} from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import {useEffect, useState, useRef} from "react";
import {Link} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {resetPassword, reset as resetPasswordState} from "../../services/auth/authResetPasswordSlice";
import {theme} from "../../constants";
import EmailInput from "../../components/EmailInput";
import PasswordInput from "../../components/PasswordInput";
import AuthFooter from "../../components/AuthFooter";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {StatusBar} from "expo-status-bar";


const ResetPassword = ({navigation, route}) => {
  const {email} = route.params;

  const dispatch = useDispatch();
  const {isLoading, isError, isSuccess, message} = useSelector((state) => state.authResetPassword);
  const [loginData, setLoginData] = useState({email: email, password: ""});
  const refInputs = [useRef(), useRef()];

  const [errors, setErrors] = useState({email: "", password: "", other: ""});
  const [info, setInfo] = useState("");

  const handleTextChange = (value) => {
    console.log(value);
    setLoginData((prev) => {
      return {...prev, ...value.content};
    });

    setErrors((prev) => {
      return {...prev, ...value.error};
    });

    /*
      if (message) {
        console.log("ResetLogin");
        dispatch(resetLogin());
      }
      */
  };

  const handleSubmitEditing = (index) => {
    console.log("handleSubmitEditing: " + index);
    Keyboard.dismiss();
  };

  /* This is to reset fields when resuming the screen. */
  useEffect(() => {
    const unsubscrible = navigation.addListener("focus", () => {
      console.log("ResetPassword::useEffect()");
      setErrors((state) => {
        return {...state, other: ""};
      });
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
      setErrors((state) => {
        return {...state, other: message.message};
      });
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      setInfo(message.message);
      setTimeout(() => {
        navigation.replace("SignIn", {email: email});
      }, 2000);

      dispatch(resetPasswordState());
    }
  }, [isSuccess]);

  const handleSubmit = (e) => {
    // e.preventDefault();
    Keyboard.dismiss();
    if (loginData.password == "" || errors.password != "" ) {
      return;
    }

    if (!isLoading) {
      dispatch(resetPassword(loginData));
    }
  };

  return (
    <View style={[theme.STYLE.container, styles.container]}>
      <StatusBar />
      <View style={theme.STYLE.header}>
        <Text style={theme.STYLE.headerText}>URM</Text>
      </View>
      <View style={[theme.STYLE.sub, styles.title]}>
        <Text variant="titleLarge">Reset Password</Text>
      </View>
      {/** Comment */}
      <View style={theme.STYLE.sub}>
        <PasswordInput
          handleTextChange={handleTextChange}
          handleSubmitEditing={handleSubmitEditing}
          index={0}
          ref={refInputs[0]}
        />
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
      {info != "" &&
        <View style={theme.STYLE.sub}>
          <HelperText
            theme={{colors: {primary: "green"}}}
            style={{paddingLeft: 0, color: "green"}}
            type="info" visible={info != ""}>
            {info}
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
          Reset Password
        </Button>
      </View>

      {/* These are the links to others  */}
      <Divider style={styles.divider} />
      <View style={{...theme.STYLE.sub, justifyContent: "center"}}>
        <Text variant='bodyMedium'>Or</Text>
      </View>

      <View style={{...theme.STYLE.sub, marginTop: 10}}>
        <Button
          style={theme.STYLE.button}
          mode='outlined'
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >Log In
        </Button>
      </View>
      <AuthFooter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    justifyContent: "center",
  },
  divider: {
    marginTop: 30,
  },
  forgot_password: {
    marginTop: 5,
    alignItems: "center",
    justifyContent: "flex-end",
  },

});

export default ResetPassword;
