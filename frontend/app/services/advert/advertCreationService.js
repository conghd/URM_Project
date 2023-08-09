import axios from "axios";

import * as MyConfig from "../../../config";

const API_URL = `${MyConfig.BE_BASE_URL}/advert/`;
const configure = (token) => {
  /*
  * Hardcoded
  */
  return {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
};

// Create new post
const createAdvert = async (advertData, token) => {
  console.log("adverService::createAdvert");
  console.log("API: " + API_URL + "create");
  console.log("advertService::token - " + token);
  const response =
  await axios.post(API_URL + "create", advertData, configure(token))
      .catch((error) => {
        console.log(error.toString());
      });

  return response.data;
};

const advertCreationService = {
  createAdvert,
};

export default advertCreationService;
