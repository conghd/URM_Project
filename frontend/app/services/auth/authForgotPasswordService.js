import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as MyConfig from '../../../config'

const API_URL = `${MyConfig.BE_BASE_URL}/user/`

const forgotPassword = async (userData) => {
  console.log(`AuthForgotPasswordService::forgotPassword- ${API_URL}forgot_password - ${JSON.stringify(userData)}`)
  const response = await axios.post(`${API_URL}forgot_password`, userData)

  if (response.data) {
    console.log("AuthForgotPasswordService::forgotPassword- " + JSON.stringify(response.data))
  }

  return response.data
}

const authForgotPasswordService = {
  forgotPassword,
}

export default authForgotPasswordService