import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Reducers/userReducer';
import cartReducer from './Reducers/cartReducer';
export const ConfigStore = configureStore({
    reducer:{
        user: userReducer,
        cart : cartReducer
    }
})