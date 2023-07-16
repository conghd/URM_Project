import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Text, HelperText } from "react-native-paper";
import { theme } from "../constants";

const PasswordInput = ({handleTextChange}) => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [pwVisible, setPwVisible] = useState(false);

    const navigation = useNavigation();

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
      handleTextChange({content: {password: text}, error: {password: msg}});

      setPassword(text);
      setError(msg);
    }

    useEffect(() => {
    }, []);

    useEffect(() => {
      const unsubscrible = navigation.addListener("focus", () => {
        setPassword("");
        setError("");
        setPwVisible(false);
      });

      return unsubscrible;
    }, [navigation]);

    return(
      <View style={styles.password}>
        <TextInput
            style={theme.STYLE.textInput}
            mode="outlined"
            label="Password"
            placeholder="Password"
            onBlur={() => {}}
            onChangeText={text => { onTextChange(text)}}
            value={password}
            secureTextEntry={!pwVisible}
            maxLength={20}
            left={<TextInput.Icon icon="lock" />}
            right={<TextInput.Icon
                      icon={pwVisible ? "eye-off": "eye"}
                      onPress={() => { setPwVisible(!pwVisible) } }/>}
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
});

export default PasswordInput;