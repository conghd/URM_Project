import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Text, HelperText } from "react-native-paper";

const PasswordInput = ({handleTextChange}) => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const validatePassword = (text) => {
      //let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      //let reg = /^\w+([\.-]?\w+)*$/;
      let reg = /^[A-Za-z]([[\.-]?[A-Za-z0-9]+)*$/;
      let msg = (reg.test(text)) ? "": "Password address is invalid";
      return msg;
    }

    const onTextChange = (text) => {
      console.log("onTextChange: " + text);
      let msg = validatePassword(text);
      handleTextChange({email: text, emailError: msg})

      setPassword(text);
      setError(msg);
    }

    useEffect(() => {

    }, []);

    return(
      <View style={styles.password}>
        <TextInput
            style={styles.input}
            mode="outlined"
            label="Password"
            placeholder="Password"
            onBlur={() => {}}
            onChangeText={text => { onTextChange(text)}}
            value={password}
            secureTextEntry
            right={<TextInput.Icon icon="eye" />}
        />
        <HelperText type="error" visible={error != ""}>
          {error}
        </HelperText>
      </View>
    );
};

const styles = StyleSheet.create({
  password: {
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

export default PasswordInput;