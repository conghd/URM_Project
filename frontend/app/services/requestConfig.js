/**
 * "Content-Type": "application/x-www-form-urlencoded",
 * "Content-Type": "multipart/form-data",
 * "Content-Type": "application/json",
 */
export const configureGet = (token, params={}) => {
  return {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    params: params,
  };
};

export const configurePost = (token, params={} ) => {
  return {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    params: params,
  };
};

export const configurePost2 = (token, params={} ) => {
  return {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    params: params,
  };
};

