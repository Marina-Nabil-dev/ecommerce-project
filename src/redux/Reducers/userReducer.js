import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userToken: null,
  // userData: null,
};
// Create a slice for user with reducers
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {      
      state.userToken = action.payload;
      localStorage.setItem("userToken", action.payload);
      // state.userData = jwtDecode(action.payload);
    },
    clearToken: (state) => {
      localStorage.removeItem("userToken");
      state.userToken = null;
      state.userData = null;
    },
  },
});

// Export the actions to use in components
export const { setToken, clearToken } = userSlice.actions;

// Export the reducer to use in the store
export default userSlice.reducer;
