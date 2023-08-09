import {useNavigation} from "@react-navigation/native";
import React, {useState, useEffect} from "react";
import {StyleSheet, View} from "react-native";
import {Button, TextInput, Text, HelperText} from "react-native-paper";
import {theme} from "../constants";

const PasswordInput = forwardRef(({handleTextChange, handleSubmitEditing,
  index, variant}, ref) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [pwVisible, setPwVisible] = useState(false);

  let label = "Password";
  if (variant === "current_password") label = "Current Password";
  if (variant === "new_password") label = "New Password";

  const navigation = useNavigation();

  const validatePassword = (text) => {
    // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    // let reg = /^\w+([\.-]?\w+)*$/;
    // let reg = /^[A-Za-z]([[\.-]?[A-Za-z0-9]+)*$/;
    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    // Your password must be at least eight characters long. It must contain at least one number and two letters, one upper case and one lower case, and one special character such as !#$%^&+=*().

    const msg = (reg.test(text)) ? "": "Minimum 8 characters, at least one uppercase letter,\
        one lowercase letter, one number & one special character";
    return msg;
  };

  const onTextChange = (text) => {
    // console.log("onTextChange: " + text);
    const msg = validatePassword(text);
    let data;
    if (variant === "current_password") {
      data = {content: {current_password: text}, error: {current_password: msg}};
    } else if (variant == "new_password") {
      data = {content: {new_password: text}, error: {new_password: msg}};
    } else {
      data = {content: {password: text}, error: {password: msg}};
    }

    handleTextChange(data);

    setPassword(text);
    setError(msg);
  };

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

  return (
    <View style={styles.password}>
      <TextInput
        ref={ref}
        style={theme.STYLE.textInput}
        mode="outlined"
        label={label}
        placeholder={label}
        onBlur={() => {
          setVisible(true);
        }}
        onChangeText={(text) => {
          onTextChange(text);
        }}
        onSubmitEditing={() => {
          handleSubmitEditing(index);
        }}
        value={password}
        secureTextEntry={!pwVisible}
        maxLength={20}
        error={error != ""}
        left={<TextInput.Icon icon="lock" />}
        right={<TextInput.Icon
          icon={pwVisible ? "eye-off": "eye"}
          onPress={() => {
            setPwVisible(!pwVisible);
          } }/>}
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
