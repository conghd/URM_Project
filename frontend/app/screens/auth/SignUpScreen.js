import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet, View, ScrollView, Image,
  Keyboard, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import { HelperText, Text, TextInput, ActivityIndicator, Button } from 'react-native-paper';
import { theme } from '../../constants';
import { register, reset } from '../../services/auth/registerSlice';
import EmailInput from '../../components/EmailInput';
import PasswordInput from '../../components/PasswordInput';
import AuthFooter from '../../components/AuthFooter';
import NameInput from '../../components/NameInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignUpScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  //const [formData, setFormData] = useState({ name: "Hoang Duc Cong", email: "conghd@gmail.com", password: "abc13579"});
  const [formData, setFormData] = useState({ name: "", email: "", password: ""});
  const {name, email, password} = formData;
  const [errors, setErrors] = useState({name: "", email: "", password: "", other: ""});
  const refInputs = [useRef(), useRef(), useRef()];

  const { isSuccess, isLoading, isError, message } = useSelector((state) => state.register)

  const handleTextChange = (value) => {
    setErrors((prev) => {return {...prev, ...value.error} })
    setFormData((prev) => { return {...prev, ...value.content} });
  }

  const setOtherError = (message) => {
    setErrors((prev) => {return {...prev, other: message}});
  }

  const displayOtherError = (message) => {
    setOtherError(message)
    setTimeout(() => {
      setOtherError("")
    }, 2000)
  }

  const handleSubmit = (e) => {
    //e.preventDefault();
    if (errors.name != "" || errors.email != "" || errors.password != "") {
      displayOtherError("Please correct above issues and try again.");
      return;
    }
    //dispatch(reset());
    console.log(formData);
    dispatch(register(formData));
  }

  const handleSubmitEditing = (index) => {
    console.log("handleSubmitEditing: " + index)
    if (index < 2) {
      refInputs[index + 1].current.focus();
    } else {
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    dispatch(reset());
  }, []);

  useEffect(() => {
    if (isSuccess && message !== null) {
      setTimeout(() => {
        navigation.replace("Activation", {verification: "ACTIVATION", email: message.email });
      }, 2000);
    }

  }, [message]);

  useEffect(() => {
    if (isError) {
      console.log("Message: " + JSON.stringify(message));
      setTimeout(() => {
        dispatch(reset());
      }, 2000);
    }

    if (isSuccess) {
      console.log("Message: " + JSON.stringify(message));
    }

    if (isSuccess && message) {
      //console.log("user: " + user);
      console.log("Message: " + message);
    }

    if (isError) {
      setErrors((prev) => {return {...prev, other: message}})
      setTimeout(() => {
        setErrors((prev) => { return {...prev, other: ""}})
      }, 5000);
    }

    return () => {
      //dispatch(reset());
    }
  }, [isSuccess, isError]);

    return (
      <View style={theme.STYLE.container} >
        <KeyboardAwareScrollView extraHeight={0}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          >
        <View style={theme.STYLE.header}>
          <Text style={theme.STYLE.headerText}>URM</Text>
        </View>
        <View style={[theme.STYLE.sub, styles.title]}>
          <Text variant="titleLarge">Account Creation</Text>
        </View>
        <View style={theme.STYLE.sub}>
          <NameInput
            handleTextChange={handleTextChange}
            handleSubmitEditing={handleSubmitEditing}
            index={0}
            ref={refInputs[0]}
          />
        </View>
        <View style={theme.STYLE.sub}>
          <EmailInput 
            handleTextChange={handleTextChange}
            handleSubmitEditing={handleSubmitEditing}
            index={1}
            ref={refInputs[1]}
          />
        </View>
        <View style={theme.STYLE.sub}>
          <PasswordInput
            handleTextChange={handleTextChange}
            handleSubmitEditing={handleSubmitEditing}
            index={2}
            ref={refInputs[2]}
          />
        </View>
        { errors.other != "" && 
          <View style={theme.STYLE.sub}>
            <View style={theme.STYLE.errorText}>
            <HelperText type="error" visible={errors.other != ""}>
              {errors.other}
            </HelperText>
            </View>
          </View>
        }

          <View style={theme.STYLE.sub}>
              <Button 
                  //icon="camera"
                  loading={isLoading}
                  style={theme.STYLE.button}
                  mode="contained"
                  onPress={() => handleSubmit() }
                  >
                  Sign Up
              </Button>
          </View>

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
              onPress={() => { navigation.navigate("SignIn")}}
              >Sign In</Button>
          </View>
        </View>
        </KeyboardAwareScrollView>
        <AuthFooter />
      </View>
    );
};

const styles = StyleSheet.create({
  title: {
    justifyContent: "center",
  }
});

export default SignUpScreen;