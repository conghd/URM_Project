import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { HelperText, Button, TextInput, Text, ActivityIndicator, Divider } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { useRef, useState, useEffect } from 'react';
import { Link } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { activate, login, reset } from '../../services/auth/authSlice'
import { resendCode } from '../../services/auth/authSlice';
import { theme } from '../../constants';
import AuthFooter from '../../components/AuthFooter';

const CODE_LENGTH = 6;
const MAX_COUNT_DOWN = 5
const ActivationScreen = ({ navigation, route }) => {
  const { verification } = route.params;
  const dispatch = useDispatch();
  const {user } = useSelector((state) => state.auth);
  const {isLoading, isError, isSuccess, message } = useSelector((state) => state.auth.activateState);
  const refDigitInputs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const [code, setCode] = useState("");
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [countDown, setCountDown] = useState();

  const handleCountDown = () => {
    let count = 5;
      setCountDown(count);
      const timer = setInterval(() => {
        if (count === 0) {
          clearInterval(timer);
        } else {
          console.log("count: " + count);
          count = count - 1;
          setCountDown(count);
        }
      }, 1000);
  }
  const isDigit = (str) => {
    if (str.length == 1 && "0123456789".includes(str)) {
      return true;
    }

    return false;
  }

  const updateDigits = (index, digit) => {
    const nextDigits = digits.map((d, i) => {
      if (i == index) {
        return digit;
      } else {
        return d;
      }
    });
    setDigits(nextDigits);
    const nextCode = nextDigits.join('');
    setCode(nextCode);
  }
  const handleKeyPress = (index, e) => {
    console.log("handleKeyPress: " + index + ", " + e.key);
    console.log("digit: " + digits[index]);
    // Handle backspace key
    if (e.key === "Backspace") {
      if (isDigit(digits[index])) {
        updateDigits(index, "");
      }

      if(digits[index] == "" && index > 0) {
        updateDigits(index - 1, "");
        refDigitInputs[index - 1].focus();
      }
    }

    // Handle digit keys
    if (isDigit(e.key) && isDigit(digits[index]) && e.key != digits[index]) {
      updateDigits(index, e.key);
      if (index < 5) {
        refDigitInputs[index+1].focus();
      } else {
        Keyboard.dismiss();
      }
    }
  }
  const handleFocus = (index, e) => {
    console.log("handleFocus: " + index + ", " + digits[index]);
    //e.selectionStart = digits[index].length;
    //e.selectionEnd = digits[index].length;
  }
  const handleTextChange = ({index, digit}) => {
    console.log("Activation::handTextChange: " + index + ", " + digit);

    if (isDigit(digit)) {
      updateDigits(index, digit);
      if (index < 5) {
        refDigitInputs[index+1].focus();
        //refDigitInputs[index + 1].selectionStart = digits[index + 1].length;
        //refDigitInputs[index + 1].selectionEnd = digits[index + 1].length;
      } else {
        Keyboard.dismiss();
      }
    }
    //return setCode(value);
  }

  const handleSubmitEditting = ({index}) => {
    if (digits[index] != "") {
      if (index < 5) {
        refDigitInputs[index + 1].focus();
      } else {
        Keyboard.dismiss();
      }
    } else {
      // Do nothing
    }
  };

  React.useEffect(() => {
    console.log("Activation::useEffect()");
    console.log("verification: " + verification);
    if (verification === "activation") {

    } else if (verification === "resetpassword") {

    }

    handleCountDown();
  }, []);

  React.useEffect(() => {
    if (isSuccess) {
      navigation.replace("ActivationComplete", {verification: verification})
    } else if (isError) {
      setError(message);
      setTimeout(() => {setError(""); }, 5000);
    }
  }, [isLoading]);

  const handleSubmit = (e) => {
    //e.preventDefault();
    //dispatch(reset());
    //setAnimating(true);
    dispatch(activate({email: user.email, code: code}));
  }

  return (
    <View style={theme.STYLE.container}>
      <View style={theme.STYLE.header}>
        <Text style={theme.STYLE.headerText}>URM</Text>
      </View>
      <View style={theme.STYLE.sub}>
        <Text variant="titleLarge">Account Activation</Text>
      </View>
      <View style={{...theme.STYLE.sub, alignItems: "center"}}>
        <Text style={styles.description} variant="bodyMedium">Enter the {user.email}</Text>
      </View>
      <View style={theme.STYLE.sub}>
        { digits.map ((d, i) => {
          return (
            <TextInput style={styles.digit}
              key={i}
              ref={(input) => { refDigitInputs[i] = input; }}
                mode="outlined"
                onBlur={() => {}}
                onKeyPress={({nativeEvent }) => { handleKeyPress(i, nativeEvent); }}
                onFocus={(e) => { handleFocus(i, e); }}
                onSubmitEditing={() => { handleSubmitEditting(i); }}
                onChangeText={digit => { handleTextChange({index: i, digit: digit} )}}
                value={digits[i]} 
                maxLength={1}
                blurOnSubmit={false}
                caretHidden={true}
                keyboardType="number-pad"
            />
          )
          })
        }
      </View>

      <View style={theme.STYLE.sub}>
        <View style={theme.STYLE.errorText} >
          <HelperText style={styles.error} type="error" visible={error!= ""}>
            {error}
          </HelperText>
        </View>
      </View>

      {/** Sign In button */}
      <View style={theme.STYLE.sub}>
        <Button 
          disabled={code.length < CODE_LENGTH}
          loading={isLoading}
          style={theme.STYLE.button}
          //icon="camera"
          mode="contained"
          onPress={() => handleSubmit() }
          >
          Activate
        </Button>
      </View>

        
      {/* These are the links to others  */}
      <View style={theme.STYLE.sub}>
        <Divider />
      </View>
      <View style={theme.STYLE.sub}>
          <Text variant="bodyMedium">Didn't get a code?</Text>
          <Text variant='bodyMedium'>{countDown > 0 ? `(${countDown})` : "" }</Text>
          <Button
            disabled={countDown > 0}
            mode='text'
            onPress={() => { dispatch(resendCode({email: user.email }))}}
          >Resend</Button>
      </View>
      {/* This is the links to others  */}

      {/* These are the links to others  */}
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
            onPress={() => { navigation.navigate("SignUp")}}
            >Sign Up</Button>
        </View>
      </View>
      {/** Footer */}
      <AuthFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    textAlign: "right",
    alignContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  digit: {
    //width: 53,
    flex: 1,
    //height: 60,
    marginLeft: 3,
    marginRight: 3,
    fontSize: 36,
  },
  error: {
    backgroundColor: "#FFFF00",
    flex: 1,
  }
});

export default ActivationScreen;