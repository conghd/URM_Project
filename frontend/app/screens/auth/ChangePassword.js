import * as React from "react";
import {View, StyleSheet, Keyboard} from "react-native";
import {HelperText, Button, Text, Divider} from "react-native-paper";
import {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {resetPassword, reset as resetPasswordState}
  from "../../services/auth/authResetPasswordSlice";
import {theme} from "../../constants";
import PasswordInput from "../../components/PasswordInput";
import AuthFooter from "../../components/AuthFooter";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";


const ChangePassword = ({navigation, route}) => {
  const {email} = route.params;

  const dispatch = useDispatch();
  const {isLoading, isError, isSuccess, message} =
    useSelector((state) => state.authResetPassword);
  const [loginData, setLoginData] =
    useState({current_password: "", new_password: ""});
  const refInputs = [useRef(), useRef()];

  const [errors, setErrors] =
  useState({current_password: "", new_password: "", other: "The password is incorrect"});
  const [info, setInfo] =
  useState("Your password has been changed successfully");

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
    if (index < 1) {
      refInputs[index + 1].current.focus();
    } else {
      Keyboard.dismiss();
    }
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
        return {...state, other: message};
      });
    }
  }, [message]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigation.replace("SignIn", {email: email});
      }, 2000);

      dispatch(resetPasswordState());
    }
    /*
      console.log("SignInScreen::useEffect, user = " + JSON.stringify(user));
      if (user != null && user.token != "") {
        if (user.activated == false) {
          navigation.replace("Activation", {verification: "activation"});
        }
      }
      */
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
    <View style={theme.STYLE.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
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
            variant='current_password'
          />
        </View>

        <View style={theme.STYLE.sub}>
          <PasswordInput
            handleTextChange={handleTextChange}
            handleSubmitEditing={handleSubmitEditing}
            index={1}
            ref={refInputs[1]}
            variant="new_password"
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
      </KeyboardAwareScrollView>
      <AuthFooter />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default ChangePassword;
