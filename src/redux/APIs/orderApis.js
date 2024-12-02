import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OrderRoutes } from "./../../routes/orderRoutes";

export const orderApis = createApi({
  reducerPath: "orderApis",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_DEVELOP_URL,
    prepareHeaders: (headers) => {
      // Retrieve token from localStorage
      const token = localStorage.getItem("userToken");
      if (token) {
        headers.set("token", `${token}`);
      }
      // Retrieve user's preferred language or default to 'en'
      const userLang = localStorage.getItem("lang") || "en";
      headers.set("Accept-Language", userLang);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getAllOrders : builder.query({
      query: ({currentPage , limit}) => OrderRoutes.All_ORDERS + (currentPage != 0  ? `?page=${currentPage}&limit=${limit}` : ``) ,
      transformResponse: (response) => response.data ? {orders : response.data, totalCount : response.results} : {orders : [], totalCount : 0}
      ,
      transformErrorResponse: (error) => {
        return error;
      },
      providesTags: ["Orders"],
  })
  }),
});

export const { useGetAllOrdersQuery } = orderApis;
