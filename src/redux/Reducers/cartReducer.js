import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postApiData } from "../../helpers/postApiData";
import { CartRoutes } from "../../routes/cartRoutes";
import toast from "react-hot-toast";
import { getApiData } from "../../helpers/getApiData";

const intialState = {
  itemNumber: 0,
  cartList: [],
  loading: false,
  errors: null,
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
  if (token) {
    return {
      cartList: [],
      itemNumber: 0,
    };
  }
  const [status, itemCount , id , data] = await getApiData(CartRoutes.USER_CART, {
    token,
  });

  console.log(data);

  if (status === "success") {
    
    return {
      cartList: data.products,
      itemNumber: itemCount,
    };
  }
});

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
        state.itemNumber = action.payload.itemCount;
      })
      .addCase(getUserCart.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
