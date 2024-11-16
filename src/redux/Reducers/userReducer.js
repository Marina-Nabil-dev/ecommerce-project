import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApiData } from "../../helpers/getApiData";
import { AuthRoutes } from "../../routes/authRoutes";
import toast from "react-hot-toast";

const initialState = {
  userToken: localStorage.getItem("userToken") || null,
  isAuthenticated: localStorage.getItem("token") ? true : false,
  userData: null,
  loading: false,
  errors: null,
};

export const verifyToken = createAsyncThunk(
  "user/verifyToken",
  async (token) => {
      const [message] = await getApiData(AuthRoutes.VERIFY_TOKEN, {
        token,
      });

      toast.success(message);

      return true;
  
  }
);
// Create a slice for user with reducers
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      localStorage.setItem("userToken", action.payload);
      state.userToken = action.payload;
      state.isAuthenticated = true;
      state.userData = action.payload.user;
    },
    clearToken: (state) => {
      localStorage.removeItem("userToken");
      state.userToken = null;
      state.userData = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true; // Token is valid
        state.userData = action.payload; // Update user data
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false; // Token is invalid
        state.errors = action.payload; // Store error message
      });
  },
});

// Export the actions to use in components
export const { setToken, clearToken } = userSlice.actions;

// Export the reducer to use in the store
export default userSlice.reducer;
