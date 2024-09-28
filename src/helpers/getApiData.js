import axios from "axios";
export const getApiData = async (routeName) => {
  try {
    const headers = {
      "Accept-Language": "en",
      Accept: "application/json",
    };

    const response = await axios.get(
      process.env.REACT_APP_API_DEVELOP_URL + routeName,
      { headers }
    );
    
    const result = response.data.data;
    
    if (typeof (result == Object)) {

      return Object.values(result);
    }    
    return result;
  } catch (error) {
    throw error; // Re-throw the error for handling in the calling component
  }
};
