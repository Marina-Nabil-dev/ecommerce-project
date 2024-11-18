import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { CartRoutes } from "../../routes/cartRoutes";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_DEVELOP_URL, // Replace with your actual base URL
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("userToken");
      if (token) {
        headers.set("token", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["CartItems"],
  endpoints: (builder) => ({
    getUserCart: builder.query({
      query: () => ({
        url: CartRoutes.USER_CART,
        method: "GET",
      }),
      providesTags: ["CartItems"],
      transformResponse: (response) => {
        if (response.status === "success") {
          return {
            cartList: response.data.products,
            itemNumber: response.numOfCartItems,
            totalPrice: response.data.totalCartPrice,
          };
        } else {
          return {
            cartList: [],
            itemNumber: 0,
            totalPrice: 0,
          };
        }
      },
    }),
    addToCart: builder.mutation({
      query: (productId) => ({
        url: CartRoutes.ADD_TO_CART,
        method: "POST",
        body: { productId },
      }),
      invalidatesTags: ["CartItems"],
      transformResponse: (response) => {
        if (response.status === "success") {
          toast.success(response.message, {
            duration: 5000,
            position: "bottom-right",
            icon: "🛒",
            iconTheme: {
              primary: "green",
              secondary: "white",
            },
            style: { color: "green" },
          });
          return {
            cartList: response.data.products,
            itemNumber: response.numOfCartItems,
            totalPrice: response.data.totalCartPrice,
          };
        } else {
          return {
            cartList: [],
            itemNumber: 0,
            totalPrice: 0,
          };
        }
      },
    }),
    clearItemFromCart : builder.mutation({
        query : () =>({
            url : CartRoutes.CLEAR_CART,
            method : "DELETE"

        }),
        invalidatesTags : ["CartItems"],
        transformResponse : (response) => {   
                     
            if (response.message === "success") {
                toast.success("Cart Cleared", {
                  duration: 5000,
                  position: "top-right",
                  icon: "🛒",
                  iconTheme: {
                    primary: "blue",
                    secondary: "white",
                  },
                  style: { color: "blue" },
                });
              }
        }
    })
  }),
});

export const { useGetUserCartQuery, useAddToCartMutation, useClearItemFromCartMutation } = cartApi;
