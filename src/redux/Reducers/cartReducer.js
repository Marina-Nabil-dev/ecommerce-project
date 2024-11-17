import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CartRoutes } from "../../routes/cartRoutes";
import toast from "react-hot-toast";
import { deleteApiData } from "../../helpers/DeleteApiData";

const intialState = {
  itemNumber: 0,
  cartList: [],
  loading: false,
  errors: null,
  totalPrice: 0,
  buttonLoading: false,
};



export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemCart",
  async (itemId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        toast.error("Not Authenticated");
        return rejectWithValue("User not authenticated"); // Explicitly reject if no token
      }

      const { status, data } = await deleteApiData(
        CartRoutes.REMOVE_ITEM_FROM_CART + itemId,
        { token: token }
      );
      if (status === 200) {
        toast.success("Item removed from the cart", {
          duration: 5000,
          position: "top-right",
          icon: "🛒",
          iconTheme: {
            primary: "green",
            secondary: "white",
          },
          style: { color: "blue" },
        });
        console.log(data);

        return itemId; // Return the itemId directly
      } else {
        return rejectWithValue("Failed to delete item from the server");
      }
    } catch (error) {
      // Handle errors
      return rejectWithValue(error.response?.data || "Failed to delete item");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: intialState,
  extraReducers: (builder) => {
  


    builder
      .addCase(removeItemFromCart.pending, (state) => {
        state.errors = null;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.itemNumber = state.itemNumber - 1;

        state.cartList = state.cartList.filter(
          (item) => item._id !== action.payload
        );
        // Update the item count
        state.itemNumber = state.cartList.length;
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.errors = action.payload; // Store error message
      });
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
