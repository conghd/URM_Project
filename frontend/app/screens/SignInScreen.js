import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, TextInput, Text, ActivityIndicator } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { Link } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../services/auth/authSlice'


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
        return setFormData((prev) => {
          return {...prev, ...value}
        });
      }

      React.useEffect(() => {
        console.log("SignIn::useEffect()");

      }, []);

      React.useEffect(() => {

      }, [isLoading]);

      const validateEmail = () => {
          //let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
          let reg = /^\w+([\.-]?\w+)*$/;
          let msg = "Email address format is invalid";
          if (reg.test(email) === true) {
            msg = ""
          }
    
          return msg;
          //setErrors((prev) => {return {...prev, email: msg}});
      }
      const validatePassword = () => {
        console.log("validatePassword");
        console.log(password);
          let msg = "Password must be at least 8 characters.";
          if (password !== "" && password.length >= 8) {
              msg = "";
          }
          return msg;
          //setErrors((prev) => {return {...prev, password: msg}});
      }
      const handleBlur = (element) => {
        let msg;
        if (element === "email") {
            msg = validateEmail();
            setErrors((prev) => {return {...prev, email: msg}});
        } else if (element === "password") {
            msg = validatePassword();
            setErrors((prev) => {return {...prev, password: msg}});
        }

        console.log(element);
      }
    
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
        <View style={styles.container}>
            <View style={styles.header}>
              <Text style={{ flex: 1, textAlign: "center", color:"#0055d2", fontSize: 40,
                fontWeight: "bold"}}>URM</Text>
              <View style={{ flexDirection: "row", width: "100%", justifyContent: "flex-start"}}>
              </View>
            </View>
            <View style={styles.sub}>
                <Text variant="titleLarge">Sign In</Text>
            </View>
            <View style={styles.sub}>
                <Text variant="bodyMedium">Please use your school email</Text>
            </View>
            <View style={styles.sub}>
                <TextInput style={styles.input}
                    mode="outlined"
                    label="Email"
                    placeholder="User ID"
                    onBlur={() => handleBlur("email")}
                    onChangeText={text => { handleTextChange({email: text} )}}
                    value={email} 
                    keyboardType="email-address"
                    right={<TextInput.Affix text="@uregina.ca" />}
                />
            </View>
                <View style={{ flexDirection: "row", width: "100%", justifyContent: "flex-start"}}>
                    <>
                    {(errors.email ) &&
                      <Text style={styles.errorText}>{errors.email}</Text>
                    }
                    
                    </>
                </View>

            {/** Comment */}
            <View style={styles.sub}>
                <TextInput
                    style={styles.input}
                    mode="outlined"
                    label="Password"
                    placeholder="Password"
                    onBlur={() => handleBlur("password")}
                    onChangeText={text => { handleTextChange({password: text} )}}
                    value={password}
                    secureTextEntry
                    rigkoht={<TextInput.Icon icon="eye" />}
                    />
            </View>

            <View style={{ alignSelf: "flex-start", flexDirection: "column", width: "100%", alignItems: "flex-start" }}>
                <>
                {(errors.password) &&
                  <Text style={styles.errorText }>{errors.password}</Text>
                }
                {(message) &&
                    <Text style={styles.errorText}>{message}</Text>
                }
                </>
            </View>

            <ActivityIndicator animating={isLoading} />

            {/** Sign In button */}
            <View style={styles.sub}>
                <Button 
                    //icon="camera"
                    mode="contained"
                    onPress={() => handleSubmit() }
                    >
                    Sign In
                </Button>
            </View>
            {/* This is the links to others  */}
            <View style={styles.sub}>
                <View style={styles.half} >
                    {/** 
                    <Link
                        style={styles.linkText}
                        to={{ screen: 'ResetPassword'}}>Forgot Password</Link>
                    */}
                    <TouchableOpacity onPress={() => { navigation.navigate("ResetPassword") }}>
                      <Text style={[styles.linkText, {flex: 1, textAlign: "center"} ]}>Forgot Password</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{...styles.half, justifyContent: "flex-end", marginRight: 10}}
                    >
                    <TouchableOpacity onPress={() => { navigation.navigate("SignUp") }}>
                      <Text style={[styles.linkText, {flex: 1, textAlign: "center"} ]}>Sign Up</Text>
                    </TouchableOpacity>
                    {/** 
                    <Link style={styles.linkText}
                        to={{ screen: 'SignUp'}} >Sign Up</Link>
                    */}
                </View>
            </View>

            <View style={styles.bottom}>
                <Text style={{ textAlign: "center", color: "#272727"}}>By creating an account, you accepted UR Market's 
                <Text style={{ color: "#0362e0" }}> Terms of Service </Text>and
                <Text style={{ color: "#0362e0" }}> Privacy Policy.</Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingLeft: 20,
        paddingRight: 20,
    },
    header: {
        marginTop: 100,
        flex: 1,
        flexDirection: "column",
      },
    sub: {
        marginTop: 10,
        flexDirection: "row",
    },
    half: {
        alignItems: "center",
        height: 60,
        flex: 1,
        flexDirection: "row",
        marginLeft: 'auto',
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
    bottom: {
        marginTop: 80,
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 360,
      },
    
      errorText: {
        flex: 1,
        paddingLeft: 40,
        fontSize: 12,
        color: 'red',
      },

});

export default SignInScreen;