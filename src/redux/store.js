import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Reducers/userReducer';
export const ConfigStore = configureStore({
    reducer:{
        user: userReducer
    }
})