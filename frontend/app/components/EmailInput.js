import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Text, HelperText } from "react-native-paper";

const EmailInput = ({handleTextChange}) => {
    const [userId, setUserId] = useState("");
    const [error, setError] = useState("");
    const navigation = useNavigation();

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

      setUserId(text);
      setError(msg);
    }

    useEffect(() => {
      const unsubscrible = navigation.addListener("focus", () => {
        setUserId("");
      });

      return unsubscrible;
    }, [navigation]);

    return(
      <View style={styles.email}>
        <TextInput style={styles.input}
          mode="outlined"
          label="Email"
          placeholder="User ID"
          onBlur={() => {}}
          onChangeText={text => { onTextChange(text)}}
          value={userId}
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
  input: {
    //flex: 1,
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