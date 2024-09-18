import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ingredient, Recipe } from "../types";

interface FridgeItem {
  _id: string;
  ingredientId: Ingredient[];

}

interface FridgeState {
  fridgeItems: FridgeItem[];
  recipeList: Recipe[];
}

const initialState: FridgeState = {
  fridgeItems: [],
  recipeList: [],
};

const fridgeSlice = createSlice({
  name: "fridge",
  initialState,
  reducers: {
    setFridgeItems: (state, action: PayloadAction<FridgeItem[]>) => {
      state.fridgeItems = action.payload;
    },
    setAddIngredientToFridge: (state, action: PayloadAction<FridgeItem>) => {
      state.fridgeItems.push(action.payload);
    },
    removeIngredientToFridge: (state, action: PayloadAction<FridgeItem>) => {
      state.fridgeItems = state.fridgeItems.filter(
        (item) => item._id !== action.payload._id
      );
    },
  },
});

export const { setFridgeItems, setAddIngredientToFridge, removeIngredientToFridge } = fridgeSlice.actions;
export default fridgeSlice.reducer;