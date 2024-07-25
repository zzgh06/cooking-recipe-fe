import { createSlice } from "@reduxjs/toolkit";

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
    setCartItems: (state, action) => {
      state.cartItem = action.payload;
      state.selectedItems = action.payload.map((item) => item.ingredientId._id);
    },
    setAddToCart: (state, action) => {
      state.cartItem.push(action.payload.data);
    },
    removeCartItem: (state, action) => {
      if (action.payload && action.payload.length > 0) {
        state.cartItem = action.payload;
      } else {
        state.cartItem = state.cartItem.filter(
          (item) => !state.selectedItems.includes(item.ingredientId._id)
        );
      }
    },
    updateCartItemState: (state, action) => {
        state.status = "succeeded";
        const { _id } = action.payload.ingredientId;
        const { qty } = action.payload;
        const itemIndex = state.cartItem.findIndex((item) => {
          return item.ingredientId._id === _id;
        });
        state.cartItem[itemIndex].qty = qty;
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
});

export const {
  setCartItems,
  setAddToCart,
  removeCartItem,
  updateCartItemState,
  toggleSelectItem,
  clearSelectedItems,
} = cartSlice.actions;
export default cartSlice.reducer;
