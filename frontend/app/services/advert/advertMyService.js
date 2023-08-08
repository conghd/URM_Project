import axios from 'axios'
import * as MyConfig from '../../../config'

const API_URL = `${MyConfig.BE_BASE_URL}/advert/`
const configure = (token) => {
  /*
  * Hardcoded
  */
  const token2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzN2E5OGUzMDYzZjg0YzVkOTdmOGNlOSIsImlhdCI6MTY2OTcyNzI4MCwiZXhwIjoxNjcyMzE5MjgwfQ.svNPp7vOhGLi4KH0Yhu24cgML4EoRPnrvRy65kXtgYk";
  return {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": 'multipart/form-data',
    },
  }
}

const getMyAdverts = async (condition, token) => {
  console.log("AdvertMyService::getMyAdverts: " + JSON.stringify(condition));
  const response = await axios.get(API_URL + "get_my_adverts", condition, configure(token))

  return response.data
}

const advertMyService = {
  getMyAdverts,
}

export default advertMyService