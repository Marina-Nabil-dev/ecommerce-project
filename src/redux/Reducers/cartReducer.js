import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postApiData } from "../../helpers/postApiData";
import { CartRoutes } from "../../routes/cartRoutes";
import toast from "react-hot-toast";
import { getApiData } from "../../helpers/getApiData";
import { deleteApiData } from "../../helpers/DeleteApiData";

const intialState = {
  itemNumber: 0,
  cartList: [],
  loading: false,
  errors: null,
  totalPrice: 0,
  buttonLoading : false,
};

export const addCart = createAsyncThunk(
  "cart/addCart",
  async (productId, { rejectWithValue }) => {
    try {
      const body = { productId };
      const token = localStorage.getItem("userToken");
      const { status, message, data } = await postApiData(
        CartRoutes.ADD_TO_CART,
        body,
        { token }
      );
      if (status === 200) {
        toast.success(message, {
          duration: 5000,
          position: "top-right",
          icon: "🛒",
          iconTheme: {
            primary: "green",
            secondary: "white",
          },
          style: { color: "green" },
        });
        return [data.data.products, data.numOfCartItems]; // Return payload
      } else {
        return rejectWithValue(message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserCart = createAsyncThunk("cart/getUserCart", async () => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return {
      cartList: [],
      itemNumber: 0,
      totalPrice: 0,
    };
  }
  const [status, itemCount, id, data] = await getApiData(CartRoutes.USER_CART, {
    "token": token,
  });
  if (status === "success") {
    return {
      cartList: data.products,
      itemNumber: itemCount,
      totalPrice: data.totalCartPrice,
    };
  }
});

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
        { "token" :token }
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

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async ({ rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        toast.error("Not Authenticated");
        return rejectWithValue("User not authenticated"); // Explicitly reject if no token
      }
      const { status } = await deleteApiData(CartRoutes.CLEAR_CART, {
        token: token,
      });
      if (status === 200) {
        return {
          cartList: [],
          itemNumber: 0,
          totalPrice: 0,
        };
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
    builder.addCase(addCart.pending, function (state, action) {
      state.loading = true;
      state.errors = null;
    });
    builder.addCase(addCart.fulfilled, function (state, action) {
      state.cartList = action.payload[0];
      state.itemNumber = action.payload[1];
      state.loading = false;
    });
    builder.addCase(addCart.rejected, function () {});

    builder
      .addCase(getUserCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartList = action.payload.cartList;
        state.itemNumber = action.payload.itemNumber;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(getUserCart.rejected, (state) => {
        state.status = "failed";
      });

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

    builder
      .addCase(clearCart.pending, function (state) {
        state.loading = false;
        state.errors = null;
        state.buttonLoading = true;
      })
      .addCase(clearCart.fulfilled, function (state, action) {
        state.cartList = action.payload.cartList;
        state.itemNumber = action.payload.itemNumber;
        state.totalPrice = action.payload.totalPrice;
        state.buttonLoading = false;
      })
      .addCase(clearCart.rejected, function (state) {
        state.errors = "Failed to delete item from the server";
      });
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
