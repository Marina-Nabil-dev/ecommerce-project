import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HomeRoutes } from "../../routes/home";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_DEVELOP_URL,
  }),
  tagTypes: ["Products"],

  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (page = 1, limit = 8) =>
        HomeRoutes.PRODUCTS + `?page=${page}&limit=${limit}`,
      transformResponse: (response) => {
        if (response.results != 0) {
          return {
            products: response.data,
            totalCount: response.results
          };
        } else {
          return {
            products: [],
            totalCount: 0,
          };
        }
      },
    })
  }),
});

export const { useGetAllProductsQuery } = productApi;
