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
    token,
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
      const { status, message, data } = await deleteApiData(
        CartRoutes.REMOVE_ITEM_FROM_CART + itemId,
        { token }
      );
      console.log(token)
      console.log(message, status, data);
      if (!token) {
        toast("Not Authenticated");
      }
      if (status === 200) {
        console.log(message,data);
        return { itemId, message: message };
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
        state.loading = true;
        state.errors = null;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartList = state.cartList.filter(
          (item) => item.id !== action.payload.itemId
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
