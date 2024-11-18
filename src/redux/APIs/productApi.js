import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HomeRoutes } from "../../routes/home";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_DEVELOP_URL,
  }),
  tagTypes: ["Products"],
  keepUnusedDataFor: 60 * 5, //how long the data should be kept in the cache after the subscriber reference count reaches zero.
  refetchOnMountOrArgChange: false, //if number in seconds: If there is no query, it will fetch the data. 
  //If there is an existing query, but the amount of time specified since the last query has not elapsed, it will serve the existing cached data. 
//  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (page = 1, limit = 8) =>
        HomeRoutes.PRODUCTS + `?page=${page}&limit=${limit}`,
      transformResponse: (response) => {
        if (response.results != 0) {
          return {
            products: response.data,
            totalCount: response.results,
          };
        } else {
          return {
            products: [],
            totalCount: 0,
          };
        }
      },
    }),
  }),
});

export const { useGetAllProductsQuery } = productApi;
