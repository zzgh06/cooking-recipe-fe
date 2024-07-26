import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fridgeItems: [],
  recipeList: [],
};

const fridgeSlice = createSlice({
  name: "fridge",
  initialState,
  reducers: {
    setFridgeItems: (state, action) => {
      state.fridgeItems = action.payload;
    },
    setAddIngredientToFridge: (state, action) => {
      state.fridgeItems.push(action.payload);
    },
    removeIngredientToFridge: (state, action) => {
      state.fridgeItems = state.fridgeItems.filter(
        (item) => item._id !== action.payload._id
      );
    },
  },
});

export const { setFridgeItems, setAddIngredientToFridge, removeIngredientToFridge } = fridgeSlice.actions;
export default fridgeSlice.reducer;
