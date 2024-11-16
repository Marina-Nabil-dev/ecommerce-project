import axios from "axios";
export const deleteApiData = async (routeName, headerObject={}) => {
  try {
    const headers = {
      "Accept-Language": "en",
      Accept: "application/json",
      ...headerObject,
    };    

    const response = await axios.delete(
      process.env.REACT_APP_API_DEVELOP_URL + routeName,
      { headers }
    );    

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return {
      status: error.response.status,
      data: error.response.data.errors,
    };
  }
};
