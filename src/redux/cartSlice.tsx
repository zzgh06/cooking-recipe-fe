import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemType } from "../types";

interface CartState {
  cartItem: CartItemType[];
  selectedItems: string[];
  cartItemCount: number;
  totalPrice: number;
  selectedTotalPrice: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CartState = {
  cartItem: [],
  selectedItems: [],
  cartItemCount: 0,
  totalPrice: 0,
  selectedTotalPrice: 0,
  status: "idle",
  error: null,
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItemType[]>) => {
      state.cartItem = action.payload;
      state.selectedItems = action.payload.map((item) => item.ingredientId._id || "");
    },
    setAddToCart: (state, action: PayloadAction<{ data: CartItemType }>) => {
      state.cartItem.push(action.payload.data);
    },
    removeCartItem: (state, action: PayloadAction<CartItemType[] | undefined>) => {
      if (action.payload && action.payload.length > 0) {
        state.cartItem = action.payload;
      } else {
        state.cartItem = state.cartItem.filter(
          (item) => !state.selectedItems.includes(item.ingredientId._id || "")
        );
      }
    },
    updateCartItemState: (state, action: PayloadAction<CartItemType>) => {
      state.status = "succeeded";
      const { _id } = action.payload.ingredientId;
      const { qty } = action.payload;
      const itemIndex = state.cartItem.findIndex((item) => {
        return item.ingredientId._id === _id;
      });
      if (itemIndex !== -1) {
        state.cartItem[itemIndex].qty = qty;
      }
    },
    toggleSelectItem: (state, action: PayloadAction<string>) => {
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
