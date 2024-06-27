import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

export const getCart = createAsyncThunk(
  "cart/getCart",
  async () => {
    const response = await api.get(`/cart`);
    return response.data;
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ingredientId, qty}) => {
    const response = await api.post(`/cart`, {ingredientId, qty});
    return response.data;
  }
);

export const editCartItem = createAsyncThunk(
  "cart/editCartItem",
  async (ingredientId) => {
    const response = await api.put(`/cart/${ingredientId}`);
    return response.data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (ingredientId) => {
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
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getCart.pending, (state) => {
            state.status = "loading";
        })
        .addCase(getCart.fulfilled, (state, action) => {
            state.status = "succeeded";
            console.log("data", action.payload.data);
            state.cartItem = action.payload.data !== null ? action.payload.data.items : [];
            state.cartItemCount = state.cartItem.length;
            console.log("cartItem.length", state.cartItem.length);
        })
        .addCase(getCart.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(addItemToCart.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.cartItem = action.payload.data.items;
            state.cartItemCount = state.cartItem.length;
            console.log(state.cartItem, state.cartItemCount);
        })
        .addCase(addItemToCart.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(editCartItem.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.cartItem = action.payload.data.items;
            state.cartItemCount = state.cartItem.length;
            console.log(state.cartItem, state.cartItemCount);
        })
        .addCase(editCartItem.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(deleteCartItem.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.cartItem = action.payload.data.items;
            state.cartItemCount = state.cartItem.length;
            console.log(state.cartItem, state.cartItemCount);
        })
        .addCase(deleteCartItem.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
    },
})

export default cartSlice.reducer;