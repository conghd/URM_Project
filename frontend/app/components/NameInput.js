import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Text, HelperText } from "react-native-paper";
import { theme } from "../constants";

const NameInput = React.forwardRef(({handleTextChange, handleSubmitEditing, index}, ref) => {
    const [name, setName] = useState("")
    const [error, setError] = useState("")
    const [visible, setVisible] = useState(false)
    const navigation = useNavigation()

    const validateName = (text) => {
      //let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      //let reg = /^\w+([\.-]?\w+)*$/;
      if (text === "") return "Your name cannot be left blank";
      if (/^\s|\s$/.test(text)) return "Your name cannot contain spaces at the start or end";
      if (text.length < 6 || text.length > 30) return "Your name must be between 6 and 30 characters long."
      //let reg = /^[A-Za-z]([[\.-]?[A-Za-z0-9]+)*$/;
      let reg = /([A-Z][a-z.]*[ -])+[A-Za-z]+/
      let msg = (reg.test(text)) ? "": "Your name must be capitalized. Only letters(a-z, A-Z), spaces, full-stops are allowed"
      return msg;
    }

    const onTextChange = (text) => {
      //console.log("onTextChange: " + text);
      let msg = validateName(text);
      handleTextChange({content: {name: text}, error: {name: msg} })

      setName(text);
      setError(msg);
    }

    useEffect(() => {
      const unsubscrible = navigation.addListener("focus", () => {
        setName("");
        setError("");
        setVisible(false);
      });

      return unsubscrible;
    }, [navigation]);

    return(
      <View style={styles.name}>
        <TextInput style={theme.STYLE.textInput}
          ref={ref}
          mode="outlined"
          label="Name"
          placeholder="Name"
          onBlur={() => { setVisible(true)}}
          onChangeText={text => { onTextChange(text)}}
          onSubmitEditing={() => handleSubmitEditing(index)}
          value={name}
          keyboardType="name-phone-pad"
          maxLength={30}
          error={error != ""}
          blurOnSubmit={false}
          left={<TextInput.Icon icon="account" />}
        />
        { (visible && error != "") ? (
          <HelperText type="error" visible={error != "" && visible }>
            {error}
          </HelperText>
        ) : (<></>)}
      </View>
    );
});

const styles = StyleSheet.create({
  name: {
    flex: 1,
  },
});

export default NameInput;