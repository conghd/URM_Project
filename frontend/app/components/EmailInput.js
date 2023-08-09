import {useNavigation} from "@react-navigation/native";
import React, {useState, useEffect} from "react";
import {StyleSheet, View} from "react-native";
import {Button, TextInput, Text, HelperText} from "react-native-paper";
import {theme} from "../constants";

const EmailInput = forwardRef(({email, handleTextChange,
  handleSubmitEditing, index}, ref) => {
  const [userId, setUserId] = useState(email? email.split("@")[0] : "");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const validateEmail = (text) => {
    // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    // let reg = /^\w+([\.-]?\w+)*$/;
    const reg = /^[A-Za-z]([[\.-]?[A-Za-z0-9]+)*$/;
    const msg = (reg.test(text)) ? "":
      "User ID must only contain characters, numbers, .(dot)";
    return msg;
  };

  const onTextChange = (text) => {
    // console.log("onTextChange: " + text);
    const msg = validateEmail(text);
    handleTextChange({content: {email: `${text}@uregina.ca`},
      error: {email: msg}});

    setUserId(text);
    setError(msg);
  };

  useEffect(() => {
    const unsubscrible = navigation.addListener("focus", () => {
      // setUserId("");
      setError("");
      setVisible(false);
    });

    return unsubscrible;
  }, [navigation]);

  return (
    <View style={styles.email}>
      <TextInput style={theme.STYLE.textInput}
        ref={ref}
        mode="outlined"
        label="Email"
        placeholder="User ID"
        onBlur={() => {
          setVisible(true);
        }}
        onChangeText={(text) => {
          onTextChange(text);
        }}
        onSubmitEditing={() => handleSubmitEditing(index) }
        value={userId}
        keyboardType="email-address"
        maxLength={20}
        blurOnSubmit={false}
        error={error != ""}
        left={<TextInput.Icon icon="email" />}
        right={<TextInput.Affix text="@uregina.ca" />}
      />
      { (visible && error != "") ?
          (
            <HelperText type="error" visible={visible && error != ""}>
              {error}
            </HelperText>
          ) : (<></>)
      }
    </View>
  );
});

const styles = StyleSheet.create({
  email: {
    flex: 1,
  },
});

export default EmailInput;
