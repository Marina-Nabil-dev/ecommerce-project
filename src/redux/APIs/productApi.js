import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HomeRoutes } from "../../routes/home";
import { ProductRoutes } from "./../../routes/productRoutes";
import toast from "react-hot-toast";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_DEVELOP_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("userToken");
      if (token) {
        headers.set("token", `${token}`);
      }
      headers.set("Accept-Language", "en");
      return headers;
    },
  }),
  tagTypes: ["Products"],
  keepUnusedDataFor: 60 * 5, //how long the data should be kept in the cache after the subscriber reference count reaches zero.
  refetchOnMountOrArgChange: false, //if number in seconds: If there is no query, it will fetch the data.
  //If there is an existing query, but the amount of time specified since the last query has not elapsed, it will serve the existing cached data.
  //  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ currentPage, limit }) =>
        HomeRoutes.PRODUCTS + `?page=${currentPage}&limit=${limit}`,

      transformResponse: (response) => {
        if (response.results !== 0) {
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
    getProduct: builder.query({
      query: (id) => ProductRoutes.PRODUCT_DETAILS + id,
      transformResponse: (response) => {
        return {
          product: response.data,
        };
      },
      transformErrorResponse: (error) => {
        return error;
      },
    }),

    addToWishlist: builder.mutation({
      query: (id) => ({
        url: ProductRoutes.WISHLIST,
        method: "POST",
        body: {
          productId: id,
        },
      }),
      transformResponse: (response) => {
        toast.success(response.message, {
          duration: 5000,
          position: "top-right",
          style: { color: "green" },
        });
      },
      transformErrorResponse: (error) => {
        return error;
      },
    }),
    getWishlistt: builder.query({
      query: () => ProductRoutes.WISHLIST,
      transformResponse: (response) => {
        if (response.count !== 0) {
          return {
            wishlist: response.data,
            count: response.count,
          };
        } else {
          return {
            wishlist: [],
            count : 0,
          };
        }
      },
      transformErrorResponse: (error) => {
        return error;
      },
    }),
    removeItemFromWishlist: builder.mutation({
      query: (id) => ({
        url: ProductRoutes.WISHLIST + id,
        method: "DELETE",
      }),
      transformResponse: (response) => {
        toast.success(response.message, {
          duration: 5000,
          position: "top-right",
          style: { color: "red" },
        });
      },
      transformErrorResponse: (error) => {
        console.log(error);
        return error;
      },
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useAddToWishlistMutation,
  useGetWishlisttQuery,
  useRemoveItemFromWishlistMutation,
} = productApi;
