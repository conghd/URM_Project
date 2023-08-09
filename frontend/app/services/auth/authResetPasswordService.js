import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import * as MyConfig from "../../../config";

const API_URL = `${MyConfig.BE_BASE_URL}/user/`;

const resetPassword = async (userData) => {
  console.log("AuthActivationService::active - " +
    API_URL + "reset_password" + JSON.stringify(userData));
  const response = await axios.post(API_URL + "reset_password", userData);
  console.log("AuthActivationService::activate -" +
    JSON.stringify(response.data));

  return response.data;
};

const authResetPasswordService = {
  resetPassword,
};

export default authResetPasswordService;
