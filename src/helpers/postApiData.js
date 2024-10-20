import axios from "axios";
export const postApiData = async (routeName, data, headerObject={}) => {
  try {
    const headers = {
      "Accept-Language": "en",
      Accept: "application/json",
      ...headerObject,
    };

    const response = await axios.post(
      process.env.REACT_APP_API_DEVELOP_URL + routeName,
      data,
      { headers }
    );

    return {
      status: response.status,
      message: response.data.message,
      data: response.data,
    };
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response.data.message,
      data: error.response.data.errors,
    };
  }
};
