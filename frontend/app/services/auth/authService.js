import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as MyConfig from '../../../config'

const API_URL = `${MyConfig.BE_BASE_URL}/user/`

// Login user
const login = async (userData) => {
  console.log("AuthService::login - " + API_URL + 'login');
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    console.log("AuthService: login - " + JSON.stringify(response.data));
    //localStorage.setItem('user', JSON.stringify(response.data))
    await AsyncStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data
}

const resendCode = async (userData) => {
  console.log("AuthService::resendCode- " + API_URL + 'activate');
  console.log("AuthService::resendCode- " + JSON.stringify(userData));
  const response = await axios.post(API_URL + 'resend_code', userData);

  if (response.data) {
    console.log("AuthService::resendCode- " + JSON.stringify(response.data));
  }

  return response.data
}

const activate = async (userData) => {
  console.log("AuthService::activate- " + API_URL + 'activate');
  console.log("AuthService::active - " + JSON.stringify(userData));
  const response = await axios.post(API_URL + 'activate', userData);

  if (response.data) {
    console.log("AuthService::activate - " + JSON.stringify(response.data));
  }

  return response.data
}

// Load data from store
const load = async () => {
  console.log("authService::load");
  const user = await AsyncStorage.getItem("user");
  const settings = await AsyncStorage.getItem("settings");
  console.log("authService::load - " + user);
  return {user: JSON.parse(user) || {}, settings: JSON.parse(settings) || {} };
}

// Logout user
const logout = async () => {
  //localStorage.removeItem('user')
  await AsyncStorage.removeItem('user')
}

const authService = {
  logout,
  login,
  load,
  activate,
  resendCode,
}

export default authService