import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Text, HelperText } from "react-native-paper";
import { theme } from "../constants";

const PasswordInput = React.forwardRef(({handleTextChange, handleSubmitEditing, index}, ref) => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [visible, setVisible] = useState(false)
    const [pwVisible, setPwVisible] = useState(false);

    const navigation = useNavigation();

    const validatePassword = (text) => {
      //let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      //let reg = /^\w+([\.-]?\w+)*$/;
      //let reg = /^[A-Za-z]([[\.-]?[A-Za-z0-9]+)*$/;
      let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/

      let msg = (reg.test(text)) ? "": "Minimum 8 characters, at least one uppercase letter,\
        one lowercase letter, one number & one special character";
      return msg;
    }

    const onTextChange = (text) => {
      //console.log("onTextChange: " + text);
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
        setVisible(false);
        setPwVisible(false);
      });

      return unsubscrible;
    }, [navigation]);

    return(
      <View style={styles.password}>
        <TextInput
          ref={ref}
            style={theme.STYLE.textInput}
            mode="outlined"
            label="Password"
            placeholder="Password"
            onBlur={() => { setVisible(true)}}
            onChangeText={text => { onTextChange(text)}}
            onSubmitEditing={() => { handleSubmitEditing(index)}}
            value={password}
            secureTextEntry={!pwVisible}
            maxLength={20}
            error={error != ""}
            left={<TextInput.Icon icon="lock" />}
            right={<TextInput.Icon
                      icon={pwVisible ? "eye-off": "eye"}
                      onPress={() => { setPwVisible(!pwVisible) } }/>}
            underlineColorAndroid="transparent"
        />
        { (visible && error != "") ? (
          <HelperText type="error" visible={error != ""}>
            {error}
          </HelperText>
        ) : (<></>)}
      </View>
    );
});

const styles = StyleSheet.create({
  password: {
    flex: 1,
  },
});

export default PasswordInput;