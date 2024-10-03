import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShoppingListItem, ShoppingListState } from "../types"; 

const initialState: ShoppingListState = {
  selectedShoppingList: [],
  completedShoppingList: [],
};

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    setShoppingList: (state, action: PayloadAction<ShoppingListItem[]>) => {
      state.selectedShoppingList = action.payload.filter(
        (item) => !item.completed
      );
      state.completedShoppingList = action.payload.filter(
        (item) => item.completed
      );
    },
    addToShoppingListToState: (state, action: PayloadAction<ShoppingListItem[]>) => {
      state.selectedShoppingList = action.payload.filter(
        (item) => !item.completed
      );
      state.completedShoppingList = action.payload.filter(
        (item) => item.completed
      );
    },
    removeShoppingListItem: (state, action: PayloadAction<ShoppingListItem[]>) => {
      state.selectedShoppingList = state.selectedShoppingList.filter(
        (item) => !action.payload.some((p) => p._id === item._id)
      );
      state.completedShoppingList = state.completedShoppingList.filter(
        (item) => !action.payload.some((p) => p._id === item._id)
      );
    },
    moveToCompletedListState: (state, action: PayloadAction<ShoppingListItem[]>) => {
      state.selectedShoppingList = state.selectedShoppingList.filter(
        (item) => !action.payload.some((p) => p._id === item._id)
      );
      state.completedShoppingList = state.completedShoppingList.concat(
        action.payload.filter((item) => item.completed)
      );
    },
  },
});

export const {
  setShoppingList,
  addToShoppingListToState,
  removeShoppingListItem,
  moveToCompletedListState,
} = shoppingListSlice.actions;

export default shoppingListSlice.reducer;
