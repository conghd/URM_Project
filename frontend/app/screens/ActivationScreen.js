import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, TextInput, Text, ActivityIndicator } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { Link } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { activate, login, reset } from '../services/auth/authSlice'


const ActivationScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const {users, isSuccess, isError, message} = useSelector((state) => state.auth);
    const {isLoading } = useSelector((state) => state.auth.activateState);

    const [formData, setFormData] = useState({ code: "" });
    const {code } = formData;
    const [errors, setErrors] = useState({code: "" });

    const handleTextChange = (value) => {
        return setFormData((prev) => {
          return {...prev, ...value}
        });
      }

      React.useEffect(() => {
        console.log("Activation::useEffect()");

      }, []);

      React.useEffect(() => {

      }, [isLoading]);

      const validateCode = () => {
          //let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
          let reg = /^\w+([\.-]?\w+)*$/;
          let msg = "Code must be 6 digits";
          if (reg.test(code) === true) {
            msg = ""
          }
    
          return msg;
          //setErrors((prev) => {return {...prev, code: msg}});
      }

      const handleBlur = (element) => {
        let msg;
        if (element === "code") {
            msg = validatecode();
            setErrors((prev) => {return {...prev, code: msg}});
        }

        console.log(element);
      }
    
      const handleSubmit = (e) => {
        //e.preventDefault();
        let codeMsg = validatecode();
        setErrors((prev) => { return {code: codeMsg}; });
        if (errors.code != "" ) {
          return;
        }

        //dispatch(reset());
        //setAnimating(true);
        dispatch(activate({code: code}));
      }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
              <Text style={{ flex: 1, textAlign: "center", color:"#0055d2", fontSize: 40,
                fontWeight: "bold"}}>UR MARKETPLACE</Text>
              <View style={{ flexDirection: "row", width: "100%", justifyContent: "flex-start"}}>
              </View>
            </View>
            <View style={styles.sub}>
                <Text variant="titleLarge">Account Activation</Text>
            </View>
            <View style={styles.sub}>
                <Text variant="bodyMedium">Please use your school code</Text>
            </View>
            <View style={styles.sub}>
                <TextInput style={styles.input}
                    mode="outlined"
                    label="Code"
                    placeholder="Code"
                    onBlur={() => handleBlur("code")}
                    onChangeText={text => { handleTextChange({code: text} )}}
                    value={coe} 
                    keyboardType="number-pad"
                />
            </View>
                <View style={{ flexDirection: "row", width: "100%", justifyContent: "flex-start"}}>
                    <>
                    {(errors.code ) &&
                      <Text style={styles.errorText}>{errors.code}</Text>
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
                    <TouchableOpacity onPress={() => { navigation.navigate("SignIn") }}>
                      <Text style={[styles.linkText, {flex: 1, textAlign: "center"} ]}>Sign In</Text>
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
        textDecorationLine: "underline",
    },
    linkText: {
        color: "#176fdb",
        fontSize: 16,
        textDecorationLine: "underline",
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

export default ActivationScreen;