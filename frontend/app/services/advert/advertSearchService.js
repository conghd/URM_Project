import axios from "axios";
import * as MyConfig from "../../../config";

const API_URL = `${MyConfig.BE_BASE_URL}/advert/`;
import {configureGet} from "../requestConfig";

const search = async (condition, token) => {
  console.log("AdvertSearchService::search: " + JSON.stringify(condition));
  const response = await axios.get(API_URL + "search",
      configureGet(token, condition));

  return response.data;
};

const advertSearchService = {
  search,
};

export default advertSearchService;
