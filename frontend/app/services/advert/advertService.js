import axios from "axios";
import * as MyConfig from "../../../config";

const API_URL = `${MyConfig.BE_BASE_URL}/advert/`;
const configure = (token) => {
  /*
  * Hardcoded
  */
  const token2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzN2E5OGUzMDYzZjg0YzVkOTdmOGNlOSIsImlhdCI6MTY2OTcyNzI4MCwiZXhwIjoxNjcyMzE5MjgwfQ.svNPp7vOhGLi4KH0Yhu24cgML4EoRPnrvRy65kXtgYk";
  return {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
};

// Get user posts
const getAdverts = async (condition, token) => {
  console.log("AdvertService::getAdverts: " + JSON.stringify(condition));
  const response = await axios.get(API_URL + "list", condition, configure(token));

  return response.data;
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

// Delete user post
const deleteAdvert = async (advertId, token) => {
  const response = await axios.delete(API_URL + advertId + "/delete", configure(token));
  return response.data;
};

const advertService = {
  getAdverts,
  createAdvert,
  deleteAdvert,
};

export default advertService;
