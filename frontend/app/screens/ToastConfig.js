import React from "react";
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
};
