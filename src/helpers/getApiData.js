import axios from "axios";
export const getApiData = async (routeName, headerObjects = {}) => {
  console.log(headerObjects);

  try {
    const headers = {
      "Accept-Language": "en",
      Accept: "application/json",
      ...headerObjects,
    };

    const response = await axios.get(
      process.env.REACT_APP_API_DEVELOP_URL + routeName,
      { headers }
    );
    let totalCount = 0;

    const result = response.data.data;
    if ("results" in response.data) {
      totalCount = response.data.results;
    }
    if ("numOfCartItems" in response.data) {
      totalCount = response.data.numOfCartItems;
    }

    if ("results" in response.data && typeof (result === Object)) {
      return [Object.values(result), totalCount];
    }

    return [result, totalCount];
  } catch (error) {
    throw error; // Re-throw the error for handling in the calling component
  }
};
