import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import { setToastMessage } from "./commonUISlice";

export const getCart = createAsyncThunk("cart/getCart", async () => {
  const response = await api.get(`/cart`);
  console.log("response", response.data.data);
  return response.data.data;
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
    console.log("deleteCartItem - ingredientId:", ingredientId);
    console.log("deleteCartItem - response data:", response.data.data);
    return response.data.data;
  }
);

export const deleteSelectedCartItems = createAsyncThunk(
  "cart/deleteSelectedCartItems",
  async (_, { dispatch, getState, rejectWithValue }) => {
    const state = getState();
    const selectedItems = state.cart.selectedItems;
    console.log("deleteSelectedCartItems - selectedItems:", selectedItems);
    
    try {
      for (const id of selectedItems) {
        const resultAction = await dispatch(deleteCartItem({ ingredientId: id })).unwrap();
        console.log("deleteCartItem result:", resultAction);
      }
    } catch (error) {
      console.error("deleteSelectedCartItems - error:", error);
      dispatch(
        setToastMessage({
          message: error.error,
          status: "error",
        })
      );

      return rejectWithValue(error.message);
    }
  }
);


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItem: [],
    selectedItems: [],
    cartItemCount: 0,
    totalPrice: 0,
    selectedTotalPrice: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    calculateSelectedTotalPrice: (state) => {
      state.selectedTotalPrice = state.cartItem
        .filter((item) => state.selectedItems.includes(item.ingredientId._id))
        .reduce((total, item) => total + item.ingredientId.price * item.qty, 0);
    },
    toggleSelectItem: (state, action) => {
      const id = action.payload;
      if (state.selectedItems.includes(id)) {
        state.selectedItems = state.selectedItems.filter(
          (itemId) => itemId !== id
        );
      } else {
        state.selectedItems.push(id);
      }
    },
    clearSelectedItems: (state) => {
      state.selectedItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCart.fulfilled, (state, action) => {
        console.log("Fetched cart items:", action.payload);
        state.status = "succeeded";
        state.cartItem = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItem.push(action.payload.data);
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
        console.log("deleteCartItem fulfilled - previous state:", state.cartItem);
        if (action.payload && action.payload.length > 0) {
          state.cartItem = action.payload;
        } else {
          state.cartItem = state.cartItem.filter(
            (item) => !state.selectedItems.includes(item.ingredientId._id)
          );
        }
        console.log("deleteCartItem fulfilled - updated state:", state.cartItem);
      })
  },
});

export const {
  calculateSelectedTotalPrice,
  toggleSelectItem,
  clearSelectedItems,
} = cartSlice.actions;
export default cartSlice.reducer;
