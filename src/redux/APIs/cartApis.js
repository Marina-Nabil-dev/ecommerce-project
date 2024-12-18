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
      headers.set("Accept-Language", "en");
      return headers;
    },
  }),
  keepUnusedDataFor: 60 * 5,
  refetchOnMountOrArgChange: false,
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
            cartId: response.cartId,
            cartList: response.data.products,
            itemNumber: response.numOfCartItems,
            totalPrice: response.data.totalCartPrice,
          };
        } else {
          return {
            cartId: 0,
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
    removeItemFromCart: builder.mutation({
      query: (productId) => ({
        url: CartRoutes.REMOVE_ITEM_FROM_CART + productId,
        method: "DELETE",
      }),
      invalidatesTags: ["CartItems"],
      transformResponse: (response) => {
        console.log(response);
        
        if (response.status === "success") {
          toast.success("Product Is Removed", {
            duration: 5000,
            position: "bottom-right",
            icon: "🛒",
            iconTheme: {
              primary: "green",
              secondary: "white",
            },
            style: { color: "green" },
          });
        }
      },
      transformErrorResponse: (error) => {
        toast.error(error, {
          duration: 5000,
          position: "bottom-right",
          icon: "🛒",
          iconTheme: {
            primary: "red",
            secondary: "white",
          },
          style: { color: "green" },
        });
      },
    }),
    clearItemFromCart: builder.mutation({
      query: () => ({
        url: CartRoutes.CLEAR_CART,
        method: "DELETE",
      }),
      invalidatesTags: ["CartItems"],
      transformResponse: (response) => {
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
      },
    }),

    checkOut: builder.mutation({
      query: ({ data, cartId }) => ({
        url: `${CartRoutes.CHECK_OUT}${cartId}`,
        method: "POST",
        body: { shippingAddress: data },
      }),
      transformResponse: (response) => {
        if (response.status === "success") {
          toast.success("Checkout successful", {
            duration: 5000,
            position: "top-right",
            icon: "🛒",
            iconTheme: {
              primary: "blue",
              secondary: "white",
            },
            style: { color: "blue" },
          });
          return response.session;
        }
      },
      refetchOnMountOrArgChange: false,
    }),
  }),
});

export const {
  useGetUserCartQuery,
  useAddToCartMutation,
  useClearItemFromCartMutation,
  useCheckOutMutation,
  useRemoveItemFromCartMutation
} = cartApi;

// // Create a baseQuery with custom error handling
// const baseQuery = fetchBaseQuery({
//   baseUrl: process.env.REACT_APP_API_DEVELOP_URL, // Replace with your actual base URL
//   prepareHeaders: (headers) => {
//     const token = localStorage.getItem('userToken');
//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// const baseQueryWith401Handler = async (args, api, extraOptions) => {
//   const result = await baseQuery(args, api, extraOptions);
  
//   // Handle 401 Unauthorized Error
//   if (result.error && result.error.status === 401) {
//     toast.error("Unauthorized access. Please log in.");

//     // Optional: Perform a logout if you want to clear the user's session
//     // api.dispatch(logoutUser()); // Logout logic can be implemented here
//   }

//   return result;
// };