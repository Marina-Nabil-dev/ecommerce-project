import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/userReducer";
import cartReducer from "./Reducers/cartReducer";
import { cartApi } from "./APIs/cartApis";

export const ConfigStore = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartApi.middleware),
});
