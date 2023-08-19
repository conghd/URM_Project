import React from "react";
import {View, Text} from "react-native";
import {InfoToast, ErrorToast, SuccessToast}
  from "react-native-toast-message";


const text1Style = {fontSize: 16};
const text2Style = {fontSize: 14};
export const toastConfig = {
  success: (props) => (
    <SuccessToast
      {...props}
      text1Style={text1Style}
      text2Style={text2Style}
    />
  ),
  info: (props) => (
    <InfoToast
      {...props}
      text1Style={text1Style}
      text2Style={text2Style}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={text1Style}
      text2Style={text2Style}
    />
  ),
  info2: ({text1, props}) => (
    <View style={{margin: 20, padding: 20,
      height: 60, width: "100%", backgroundColor: "tomato"}}>
      <Text>{text1}</Text>
    </View>
  ),
};
