import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as MyConfig from "../../../config";

// const API_URL = `${MyConfig.BE_BASE_URL}/user/`

// load settings
const load = async (userData) => {
  console.log("SettingsService::load- ");
  const settings = await AsyncStorage.getItem("settings");

  return JSON.parse(settings) || {};
};

const save = async (settings) => {
  await AsyncStorage.setItem("settings", JSON.stringify(settings));
};

const settingsService = {
  load,
  save,
};

export default settingsService;
