import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/userReducer";
import cartReducer from "./Reducers/cartReducer";
import { cartApi } from "./APIs/cartApis";
import { productApi } from "./APIs/productApi";
import { categoryApi } from "./APIs/categoryApi";

export const ConfigStore = configureStore({
  reducer: {
    user: userReducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [productApi.reducerPath] : productApi.reducer,
    [categoryApi.reducerPath] : categoryApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartApi.middleware).concat(productApi.middleware).concat(categoryApi.middleware),
});
