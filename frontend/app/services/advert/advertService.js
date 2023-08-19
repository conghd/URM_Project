import axios from "axios";
import * as MyConfig from "../../../config";

const API_URL = `${MyConfig.BE_BASE_URL}/advert/`;

import {configureGet, configurePost, configurePost2} from "../requestConfig";

// GET ADVERTS
const getAdverts = async (params, token) => {
  console.log("AdvertService::getAdverts: " + JSON.stringify(params));
  const response = await axios.get(API_URL + "list",
      configureGet(token, params));

  return response.data;
};

// GET SINGLE ADVERT
const getAdvert = async (advertId, token) => {
  console.log("AdvertService::getAdvert: " + JSON.stringify(advertId));
  const response = await axios.get(API_URL + "get" + advertId,
      configureGet(token));

  return response.data;
};

// Create new post
const createAdvert = async (advertData, token) => {
  console.log("adverService::createAdvert");
  console.log("API: " + API_URL + "create");
  console.log("advertService::token - " + token);
  const response =
  await axios.post(`${MyConfig.BE_BASE_URL}/listing/create`,
      advertData, configurePost2(token))
      .catch((error) => {
        console.log(error.toString());
      });

  return response.data;
};

// Delete user post
const deleteAdvert = async (advertId, token) => {
  const response = await axios.delete(API_URL + advertId + "/delete",
      configure(token));
  return response.data;
};

const advertService = {
  getAdverts,
  getAdvert,
  createAdvert,
  deleteAdvert,
};

export default advertService;
