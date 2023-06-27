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
import { TextInput, ActivityIndicator, Button } from 'react-native-paper';

import { register, reset } from '../services/auth/registerSlice';

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
    console.log("RegisterScreen::useEffect");
    console.log("isSuccess: " + isSuccess);
    console.log("isError: " + isError);
    console.log("message: " + message);
    console.log("isLoading: " + isLoading);
    //if (registerFirst) {
    //  console.log("registerFirst");
    //  dispatch(reset());
    //  setTimeout(() => {
    //    setRegisterFirst(false);
    //  }, 1000);
    //}
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
      Alert.alert("Success", "Account registration has been completed. An activation code has been sent to your email. You should activate in the first log in");
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
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container} >
        <View style={styles.header}>
          <Text style={{ flex: 1, textAlign: "center", color:"#0055d2", fontSize: 40,
            fontWeight: "bold"}}>UR MARKETPLACE</Text>
          <Text style={styles.text}>Create a new account</Text>
          <View style={{ flexDirection: "row", width: "100%", justifyContent: "flex-start"}}>
          </View>
        </View>
        <View style={styles.loginSection}>
          <TextInput
            mode='outlined'
            label="Name (Required)"
            style={styles.textInput}
            onBlur={() => handleBlur("name")}
            onChangeText={text => { handleTextChange({name: text} )}}
            value={name}
            keyboardType="name-phone-pad"
          />
          <View style={{ flexDirection: "row", width: "100%", justifyContent: "flex-start"}}>
            {(errors.email ) &&
              <Text style={styles.errorText}>{errors.email}</Text>
            }
          </View>
          <TextInput
            mode='outlined'
            label="Email (Required)"
            placeholder="User ID"
            style={styles.textInput}
            onBlur={() => handleBlur("email")}
            onChangeText={text => { handleTextChange({email: text} )}}
            value={email}
            keyboardType="email-address"
            right={<TextInput.Affix text="@uregina.ca" />}
          />
          <View style={{ flexDirection: "row", width: "100%", justifyContent: "flex-start"}}>
            {(errors.email ) &&
              <Text style={styles.errorText}>{errors.email}</Text>
            }
          </View>
          <TextInput
            mode='outlined'
            label="Password (Required)"
            style={styles.textInput}
            onBlur={() => handleBlur("password")}
            onChangeText={text => { handleTextChange({password: text} )}}
            value={password}
            secureTextEntry
          />
          <View style={{ flexDirection: "row", width: "100%", justifyContent: "flex-start"}}>
          {(errors.password) &&
            <Text style={styles.errorText}>{errors.password}</Text>
          }
          </View>
          <View style={{ flexDirection: "row", width: "100%", justifyContent: "flex-start"}}>
          {(errors.other) &&
            <Text style={[styles.errorText, {paddingTop: 15}] }>{errors.other}</Text>
          }
          </View>
        <ActivityIndicator animating={animating} />
            <View style={styles.sub}>
                <Button 
                    //icon="camera"
                    mode="contained"
                    onPress={() => handleSubmit() }
                    >
                    Sign Up
                </Button>
            </View>
        {/**
         * 
            <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
              <Text style={styles.btn_text}>Create New Account</Text>
            </TouchableOpacity>
         */}
        <View style={{ flex: 1, flexDirection: "column", alignItems: "center", marginTop: 0}}>
          <Text style={[styles.text, {flex: 1, textAlign: "center", marginTop: 10 } ]}>or</Text>
          <TouchableOpacity onPress={() => { 
            navigation.navigate("SignIn");
             }}>
            <Text style={[styles.linkText, {flex: 1, textAlign: "center"} ]}>Sign In</Text>
          </TouchableOpacity>
        </View>

        </View>
        <View style={styles.bottom}>
            <Text style={{ textAlign: "center", color: "#272727"}}>By creating an account, you accepted UR Market's 
            <Text style={{ color: "#0362e0" }}> Terms of Service </Text>and
            <Text style={{ color: "#0362e0" }}> Privacy Policy.</Text>
            </Text>
        </View>
      </View>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: "#FFFFFF",
  },
    sub: {
        marginTop: 10,
        flexDirection: "row",
    },
  header: {
    marginTop: 100,
    flex: 1,
    flexDirection: "column",
  },
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
    height: 40,
    width: 360,
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