import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Text, HelperText } from "react-native-paper";

const EmailInput = ({handleTextChange}) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const validateEmail = (text) => {
      //let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      //let reg = /^\w+([\.-]?\w+)*$/;
      let reg = /^[A-Za-z]([[\.-]?[A-Za-z0-9]+)*$/;
      let msg = (reg.test(text)) ? "": "Email address is invalid";
      return msg;
    }

    const onTextChange = (text) => {
      console.log("onTextChange: " + text);
      let msg = validateEmail(text);
      handleTextChange({email: text, emailError: msg})

      setEmail(text);
      setError(msg);
    }

    useEffect(() => {

    }, []);

    return(
      <View style={styles.email}>
        <TextInput style={styles.input}
          mode="outlined"
          label="Email"
          placeholder="User ID"
          onBlur={() => {}}
          onChangeText={text => { onTextChange(text)}}
          value={email}
          keyboardType="email-address"
          maxLength={20}
          right={<TextInput.Affix text="@uregina.ca" />}
        />
        <HelperText type="error" visible={error != ""}>
          {error}
        </HelperText>
      </View>
    );
};

const styles = StyleSheet.create({
  email: {
    flex: 1,
  },
  errorText: {
    color: "#dd0000",
    /*
      flexDirection: "row",
      width: "100%",
      justifyContent: "flex-start",
    */
  }
});

export default EmailInput;