import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import { setToastMessage } from "./commonUISlice";

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { dispatch }) => {
    const response = await api.get(`/cart`);
    const cartItems = response.data.data;
    return cartItems;
  }
);

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

    return response.data.data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ ingredientId }) => {
    const response = await api.delete(`/cart/${ingredientId}`);
    console.log("response", response)
    return response.data.data;
  }
);

export const deleteSelectedCartItems = createAsyncThunk(
  "cart/deleteSelectedCartItems",
  async (_, { dispatch, getState, rejectWithValue }) => {
    const state = getState();
    const selectedItems = state.cart.selectedItems;

    try {
      // 디버깅을 위해 로그 추가
      console.log("Deleting selected items:", selectedItems);

      for (const id of selectedItems) {
        await dispatch(deleteCartItem({ ingredientId: id })).unwrap();
      }

      await dispatch(getCart());  // 갱신된 카트 데이터를 가져옵니다
      dispatch(clearSelectedItems());  // 선택된 아이템을 초기화합니다

      // 로그 추가
      console.log("Finished deleting selected items");
    } catch (error) {
      console.error("Error deleting selected cart items:", error);
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
        state.status = "succeeded";
        state.cartItem = action.payload;
        state.selectedItems = action.payload.map(
          (item) => item.ingredientId._id
        );
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
        const { _id } = action.payload.ingredientId;
        const { qty } = action.payload;
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
        if (action.payload && action.payload.length > 0) {
          state.cartItem = action.payload;
        } else {
          state.cartItem = state.cartItem.filter(
            (item) => !state.selectedItems.includes(item.ingredientId._id)
          );
        }
      });
  },
});

export const {
  toggleSelectItem,
  clearSelectedItems,
} = cartSlice.actions;
export default cartSlice.reducer;
