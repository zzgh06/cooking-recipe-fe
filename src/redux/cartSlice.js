import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import { setToastMessage } from "./commonUISlice";

export const getCart = createAsyncThunk("cart/getCart", async () => {
  const response = await api.get(`/cart`);
  return response.data;
});

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ ingredientId, qty }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post(`/cart`, { ingredientId, qty });
      dispatch(
        setToastMessage({
          message: "카트에 상품이 추가됐습니다",
          status: "success",
        })
      );
      return response.data;
    } catch (error) {
      dispatch(
        setToastMessage({
          message: error.error,
          status: "error",
        })
      );
      console.log("setToastMessage");
      return rejectWithValue(error.message);
    }
  }
);

export const editCartItem = createAsyncThunk(
  "cart/editCartItem",
  async ({ ingredientId, qty }) => {
    const response = await api.put(`/cart/${ingredientId}`, { qty });
    return response.data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ ingredientId }) => {
    const response = await api.delete(`/cart/${ingredientId}`);
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItem: [],
    cartItemCount: 0,
    totalPrice: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    calculateTotalPrice: (state) => {
      state.totalPrice = state.cartItem.reduce((total, item) => {
        return total + item.ingredientId.price * item.qty;
      }, 0);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItem =
          action.payload.data !== null ? action.payload.data.items : [];
        state.cartItemCount = state.cartItem.length;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        //console.log(action.payload);
        state.cartItem.push(action.payload.data);
        state.cartItemCount = state.cartItem.length;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editCartItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { _id } = action.payload.data.ingredientId;
        const { qty } = action.payload.data;
        const itemIndex = state.cartItem.findIndex((item) => {
          return item.ingredientId._id === _id;
        });
        state.cartItem[itemIndex].qty = qty;
      })
      .addCase(editCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItem = action.payload.data;
        state.cartItemCount = state.cartItem.length;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { calculateTotalPrice } = cartSlice.actions;
export default cartSlice.reducer;
