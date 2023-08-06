import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { HelperText, Button, TextInput, Text, ActivityIndicator, Divider } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { useRef, useState, useEffect } from 'react';
import { Link } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { activate, reset as resetActivation } from '../../services/auth/authActivationSlice';
import { update } from '../../services/settings/settingsSlice';
import { resendCode } from '../../services/auth/authSlice';
import { theme } from '../../constants';
import AuthFooter from '../../components/AuthFooter';

const CODE_LENGTH = 6;
const MAX_COUNT_DOWN = 5
const ActivationScreen = ({ navigation, route }) => {
  const {email, verification } = route.params;
  const dispatch = useDispatch();
  const {isLoading, isError, isSuccess, message } = useSelector((state) => state.authActivation);
  const refDigitInputs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const [code, setCode] = useState("");
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [countDown, setCountDown] = useState();

  const handleCountDown = () => {
    let count = 14
      setCountDown(count);
      const timer = setInterval(() => {
        if (count === 0) {
          clearInterval(timer);
        } else {
          count = count - 1;
          setCountDown(count);
        }
      }, 1000);
  }

  const handleResend = () => {
    handleCountDown()
    if (!isLoading) {
      dispatch(resendCode({email: email, type: verification }))
    }
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
    //console.log("handleKeyPress: " + index + ", " + e.key);
    //console.log("digit: " + digits[index]);
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

  // ?????? WHY {index} instead of index
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
    console.log("Activation::verification: " + verification);
    if (verification === "ACTIVATION") {

    } else if (verification === "FORGOT_PASSWORD") {

    }

    console.log(`ActivationScreen::useEffect[] - isLoading: ${isLoading}, isSuccess: ${isSuccess}, isError: ${isError}`)
    dispatch(resetActivation())
    handleCountDown();
  }, []);

  useEffect(() => {
    console.log(`ActivationScreen::useEffect[isLoading], isLoading: ${isLoading}, isSuccess: ${isSuccess}, isError: ${isError}`)

  }, [isLoading])

  useEffect(() => {
    console.log(`ActivationScreen::useEffect[isSuccess] isLoading: ${isLoading}, isSuccess: ${isSuccess}, isError: ${isError}`)
    if (isSuccess) {
      if (verification === "ACTIVATION") {
        navigation.replace("ActivationComplete", {verification: verification, email: email })
      } else if (verification === 'FORGOT_PASSWORD') {
        navigation.replace("ResetPassword", {verification: verification, email: email})
      } else {
        // DO NOTHING
      }

      dispatch(resetActivation())
    }
  }, [isSuccess]);


  useEffect(() => {
    console.log(`ActivationScreen::useEffect[isError], isLoading: ${isLoading}, isSuccess: ${isSuccess}, isError: ${isError}`)
    if (isError) {
      setError(message.message);
      console.log(message.message)
      setTimeout(() => {setError(""); }, 5000);
    
      dispatch(resetActivation())
    }
  }, [isError])

  const handleSubmit = (e) => {
    //e.preventDefault();
      console.log('ActivationScreen::handleSubmit(%s)', verification)

    dispatch(activate({email: email, code: code, type: verification}));
  }

  return (
    <View style={theme.STYLE.container}>
      <View style={theme.STYLE.header}>
        <Text style={theme.STYLE.headerText}>URM</Text>
      </View>
      <View style={[theme.STYLE.sub, styles.title]}>
        <Text variant="titleLarge">Account Verification</Text>
      </View>
      <View style={{...theme.STYLE.sub, justifyContent: "center"}}>
        <Text style={styles.description} variant="bodyMedium">A verification code has been sent to your email {email}. Enter the 6 digits to verify your account</Text>
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
                blurOnSubmit={false} // Used to allow the keyboard is still on
                caretHidden={true}
                keyboardType="number-pad"
            />
          )
          })
        }
      </View>

      { error &&
      <View style={{...theme.STYLE.sub, marginTop: 0}}>
        <HelperText style={styles.error} type="error" visible={error!= ""}>
          {error}
        </HelperText>
      </View>
      }

      {/* These are the links to others  */}
      <View style={{...theme.STYLE.sub, marginTop: 0, alignItems: 'center'}}>
          <Text variant="bodyMedium">Didn't get a code?</Text>
          <Text variant='bodyMedium'>{countDown > 0 ? `(${countDown})` : "" }</Text>
          <Button
            disabled={countDown > 0}
            mode='text'
            onPress={handleResend}
          >Resend</Button>
      </View>

      {/** Sign In button */}
      <View style={theme.STYLE.sub}>
        <Button 
          disabled={code.length < CODE_LENGTH || isLoading}
          loading={isLoading}
          style={theme.STYLE.button}
          //icon="camera"
          mode="contained"
          onPress={() => handleSubmit() }
          >
          Verify
        </Button>
      </View>

        
      {/* This is the links to others  */}

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
          >Cancel</Button>
      </View>
      {/** Footer */}
      <AuthFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    justifyContent: "center",
  },
  description: {
    textAlign: "left",
    alignContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  digit: {
    //width: 53,
    flex: 1,
    //height: 60,
    marginLeft: 3,
    marginRight: 3,
    fontSize: 36,
  },
  divider: {
    marginTop: 30,
  },
  error: {
    flex: 1,
    paddingLeft: 0,
  },
  extra: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
});

export default ActivationScreen;