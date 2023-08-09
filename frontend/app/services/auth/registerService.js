import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import * as MyConfig from "../../../config";

const API_URL = `${MyConfig.BE_BASE_URL}/user/`;

// Register user
const register = async (userData) => {
  console.log("RegisterService::register - " + API_URL + "register");
  const response = await axios.post(API_URL + "register", userData);
  if (response.data) {
    // console.log("R: " + response.data);
    // localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data;
};

const registerService = {
  register,
};

export default registerService;
