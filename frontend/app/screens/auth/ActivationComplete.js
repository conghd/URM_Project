import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { Button, TextInput, Text, ActivityIndicator, Divider } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { useRef, useState, useEffect } from 'react';
import { Link } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { activate, login, reset } from '../../services/auth/authSlice'
import { update } from '../../services/settings/settingsSlice';
import { theme } from '../../constants';
import AuthFooter from '../../components/AuthFooter';

const ActivationComplete = ({ navigation, route }) => {
  const dispatch = useDispatch();
  //const { update } = useSelector((state) => state.settings)
  const {user } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("Activation::useEffect()");

  }, []);

  React.useEffect(() => {
    console.log("Activation::useEffect(isLoading)");


  }, []);

  const handleSubmit = (e) => {
    //e.preventDefault();
    navigation.replace("SignIn", {})
    dispatch(update({isNewAccount: false }))
  }

  return (
    <View style={theme.STYLE.container}>
      <View style={theme.STYLE.header}>
        <Text style={theme.STYLE.headerText}>URM</Text>
      </View>
      <View style={theme.STYLE.sub}>
        <Text variant="titleLarge">Activation Complete</Text>
      </View>
      <View style={{...theme.STYLE.sub, alignItems: "center"}}>
        <Text style={styles.description} variant="bodyMedium">Activation code is correct!</Text>
      </View>

      {/** Sign In button */}
      <View style={theme.STYLE.sub}>
        <Button 
          style={theme.STYLE.button}
          //icon="camera"
          mode="contained"
          onPress={() => { handleSubmit() } }
          >
          Next
        </Button>
      </View>

        
      {/* This is the links to others  */}

      {/* These are the links to others  */}
      {/** Footer */}
      <AuthFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    textAlign: "right",
    alignContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});

export default ActivationComplete;