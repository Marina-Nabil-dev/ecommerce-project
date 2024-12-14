import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/userReducer";
import { cartApi } from "./APIs/cartApis";
import { productApi } from "./APIs/productApi";
import { categoryApi } from "./APIs/categoryApi";
import { orderApis } from "./APIs/orderApis";
import { brandApi } from "./APIs/brandApis";

export const ConfigStore = configureStore({
  reducer: {
    user: userReducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [orderApis.reducerPath]: orderApis.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(cartApi.middleware)
      .concat(productApi.middleware)
      .concat(categoryApi.middleware)
      .concat(orderApis.middleware)
      .concat(brandApi.middleware),
});
