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
  const [registerFirst, setRegisterFirst] = useState(true); 
  const dispatch = useDispatch();
  //const [formData, setFormData] = useState({ name: "Hoang Duc Cong", email: "conghd@gmail.com", password: "abc13579"});
  const [formData, setFormData] = useState({ name: "", email: "", password: ""});
  const {name, email, password} = formData;
  const [errors, setErrors] = useState({name: "", email: "", password: "", other: ""});
  const [animating, setAnimating] = useState(false);

  const { isSuccess, user, isLoading, isError, message } = useSelector((state) => state.register)

  const handleTextChange = (value) => {
    setErrors((prev) => {return {...prev, other: ""} })
    return setFormData((prev) => {
      return {...prev, ...value}
    });
  }

  const handleBlur = (element) => {
    if (element === "email") {
      //let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      let reg = /^\w+([\.-]?\w+)*$/;
      let msg = "Email address format is invalid";
      if (reg.test(email) === true) {
        msg = ""
      }

      setErrors((prev) => {return {...prev, email: msg}});
    } else if (element === "password") {
      let msg = "Password must be at least 8 characters.";
      if (password && password.length >= 8) {
          msg = "";
      }
      setErrors((prev) => {return {...prev, password: msg}});
    } else if (element === "name") {
      let msg = (name && name.length > 0) ? "" : "Name must be not empty";
      setErrors((prev) => {return {...prev, name: msg}});
    }
  }

  const handleSubmit = (e) => {
    //e.preventDefault();
    if (errors.name != "" || errors.email != "" || errors.password != "") {
      return;
    }
    //dispatch(reset());
    setAnimating(true);
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
      setAnimating(false);
      setTimeout(() => {
        //Alert.alert("Success", "Account registration has been completed. An activation code has been sent to your email. You should activate in the first log in");
        navigation.navigate('SignIn');
      }, 1000)
    }

    if (isError) {
      setAnimating(false);
      setErrors((prev) => {return {...prev, other: message}})
    }

    return () => {
      console.log("2222");
      dispatch(reset());
    }
  }, [isSuccess, isError, message]);

    return (
      <View style={theme.STYLE.container} >
        <View style={theme.STYLE.header}>
          <Text style={theme.STYLE.headerText}>URM</Text>
        </View>
        <View style={theme.STYLE.sub}>
          <Text variant="titleLarge">Create a new account</Text>
        </View>
        <View style={theme.STYLE.sub}>
          <TextInput
            mode='outlined'
            label="Name (Required)"
            style={styles.textInput}
            onBlur={() => handleBlur("name")}
            onChangeText={text => { handleTextChange({name: text} )}}
            value={name}
            keyboardType="name-phone-pad"
          />
        </View>
          <View style={theme.STYLE.sub}>
              <EmailInput 
                  handleTextChange={handleTextChange}
                  handleErrors={console.log("handleErrors")}
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
            <View style={styles.sub}>
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
  logo: {
    resizeMode: "cover",
  },
  loginSection: {
    marginTop: 20,
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  bottom: {
    marginTop: 50,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 360,
  },
  btn: {
    backgroundColor: '#0063E5',
    padding: 10,
    margin: 10,
    width: 360,
    alignItems: "center",
  },
  btn_text: {
    fontSize: 18,
    color: '#fff',
  },
  loginContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6'
  },
  textInput: {
    marginTop: 20,
    //height: 40,
    //width: 360,
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  text: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    color: "#272727",
  },
  linkText: {
    color: "#176fdb",
    fontSize: 16
  },
  errorText: {
    flex: 1,
    paddingLeft: 40,
    fontSize: 12,
    color: 'red',
  },
});

export default SignUpScreen;