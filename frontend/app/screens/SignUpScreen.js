import React, {useState, useEffect, createRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet,
  //TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  //Button,
  Alert
} from 'react-native';
import { HelperText, TextInput, ActivityIndicator, Button } from 'react-native-paper';
import { theme } from '../constants';
import { register, reset } from '../services/auth/registerSlice';
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import AuthFooter from '../components/AuthFooter';

const SignUpScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  //const [formData, setFormData] = useState({ name: "Hoang Duc Cong", email: "conghd@gmail.com", password: "abc13579"});
  const [formData, setFormData] = useState({ name: "", email: "", password: ""});
  const {name, email, password} = formData;
  const [errors, setErrors] = useState({name: "", email: "", password: "", other: ""});

  const { isSuccess, user, isLoading, isError, message } = useSelector((state) => state.register)

  const handleTextChange = (value) => {
    setErrors((prev) => {return {...prev, other: ""} })
    return setFormData((prev) => {
      return {...prev, ...value}
    });
  }

  const handleSubmit = (e) => {
    //e.preventDefault();
    if (errors.name != "" || errors.email != "" || errors.password != "") {
      return;
    }
    //dispatch(reset());
    const form = {name: name, email: `${email}@uregina.ca`, password: password};
    setTimeout(() => {
      //dispatch(register(formData));
      dispatch(register(form));
    }, 1000);
  }

  useEffect(() => {
    dispatch(reset());
  }, []);

  useEffect(() => {
    if (isError) {
      console.log("Message: " + JSON.stringify(message));
    }

    if (isSuccess) {
      console.log("Message: " + JSON.stringify(message));
    }

    if (isSuccess && message) {
      console.log("user: " + user);
      console.log("Message: " + message);
      setTimeout(() => {
        //Alert.alert("Success", "Account registration has been completed. An activation code has been sent to your email. You should activate in the first log in");
        navigation.navigate('SignIn');
      }, 1000)
    }

    if (isError) {
      setErrors((prev) => {return {...prev, other: message}})
    }

    return () => {
      dispatch(reset());
    }
  }, [isSuccess, isError, message]);

    return (
      <View style={theme.STYLE.container} >
        <View style={theme.STYLE.header}>
          <Text style={theme.STYLE.headerText}>URM</Text>
        </View>
        <View style={theme.STYLE.sub}>
          <Text variant="titleLarge">Account Creation</Text>
        </View>
        <View style={theme.STYLE.sub}>
          <TextInput
            mode='outlined'
            label="Name (Required)"
            style={theme.STYLE.textInput}
            onBlur={() => handleBlur("name")}
            onChangeText={text => { handleTextChange({name: text} )}}
            value={name}
            keyboardType="name-phone-pad"
          />
        </View>
          <View style={theme.STYLE.sub}>
              <EmailInput 
                  handleTextChange={handleTextChange}
                  />
          
          </View>
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
            <View style={theme.STYLE.sub}>
                <Button 
                    //icon="camera"
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
      <AuthFooter />
      </View>
    );
};

const styles = StyleSheet.create({
});

export default SignUpScreen;