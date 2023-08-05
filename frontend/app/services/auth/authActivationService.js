import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as MyConfig from '../../../config'

const API_URL = `${MyConfig.BE_BASE_URL}/user/`

const activate = async (userData) => {
  console.log("AuthActivationService::activate- " + API_URL + 'activate');
  console.log("AuthActivationService::active - " + JSON.stringify(userData));
  const response = await axios.post(API_URL + 'verify_account', userData)
  console.log("AuthActivationService::activate - " + JSON.stringify(response.data));

  return response.data
}

const authActivationService = {
  activate,
}

export default authActivationService