import axios from "axios";
import * as MyConfig from "../../../config";

const API_URL = `${MyConfig.BE_BASE_URL}/advert/`;
const API_URL2 = `${MyConfig.BE_BASE_URL}/listing/`;
import {configureGet, configurePost} from "../requestConfig";

const getMyAdverts = async (condition, token) => {
  console.log("AdvertMyService::getMyAdverts: " + JSON.stringify(condition));
  const response = await axios.get(API_URL + "get_my_adverts",
      configureGet(token, condition));

  return response.data;
};

const sellMyAdvert= async (condition, token) => {
  console.log("AdvertMyService::sellMyAdvert: " + JSON.stringify(condition));
  const response = await axios.get(API_URL2 + "sell",
      configureGet(token, condition));

  return response.data;
};

const deleteMyAdvert= async (condition, token) => {
  console.log("AdvertMyService::sellMyAdvert: " + JSON.stringify(condition));
  const response = await axios.get(API_URL2 + "delete",
      configureGet(token, condition));

  return response.data;
};
const updateStatus = async (condition, token) => {
  console.log("AdvertMyService::updateStatus: " + JSON.stringify(condition));
  const response = await axios.get(API_URL2 + "update_status",
      configureGet(token, condition));

  return response.data;
};

const updateBookmark = async (condition, token) => {
  console.log("AdvertMyService::updateBookmark: " + JSON.stringify(condition));
  const response = await axios.post(API_URL2 + "update_bookmark", condition,
      configurePost(token));

  return response.data;
};

const getBookmarks = async (condition, token) => {
  console.log("AdvertMyService::getBookmarks : " + JSON.stringify(condition));
  const response = await axios.get(API_URL2 + "get_bookmarks",
      configureGet(token, condition));

  return response.data;
};

const advertMyService = {
  getMyAdverts,
  sellMyAdvert,
  deleteMyAdvert,
  updateStatus,
  updateBookmark,
  getBookmarks,
};

export default advertMyService;
