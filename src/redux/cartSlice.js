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
  async ({ingredientId, qty}) => {
    console.log("ingredientId", ingredientId);
    console.log("qty", qty);
    const response = await api.put(`/cart/${ingredientId}`, {qty});
    return response.data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ingredientId}) => {
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
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getCart.pending, (state) => {
            state.status = "loading";
        })
        .addCase(getCart.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.cartItem = action.payload.data !== null ? action.payload.data.items : [];
            state.cartItemCount = state.cartItem.length;
            console.log("rrrrrrrrrrrrr", state.cartItem);
            console.log("state.totalPrice", state.totalPrice);
        })
        .addCase(getCart.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(addItemToCart.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.cartItem.push(action.payload.data);
            state.cartItemCount = state.cartItem.length;
            console.log(state.cartItem, state.cartItemCount);
        })
        .addCase(addItemToCart.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(editCartItem.fulfilled, (state, action) => {
            state.status = "succeeded";
            const {_id} = action.payload.data.ingredientId;
            const {qty} = action.payload.data;
            const itemIndex = state.cartItem.findIndex(item => {
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
            console.log(state.cartItem, state.cartItemCount);
        })
        .addCase(deleteCartItem.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
    },
})

export const {calculateTotalPrice} = cartSlice.actions;
export default cartSlice.reducer;