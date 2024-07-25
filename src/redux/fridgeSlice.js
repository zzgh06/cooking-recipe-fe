import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fridgeItems: [],
  recipeList: [],
};

const fridgeSlice = createSlice({
  name: "fridge",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setAddIngredientToFridge: (state, action) => {
      state.fridgeItems.push(action.payload);
    },
    removeIngredientToFridge: (state, action) => {
      state.fridgeItems = state.fridgeItems.filter(
        (item) => item._id !== action.payload.userFrige._id
      );
    },
  },
});

export const { setError, setAddIngredientToFridge, removeIngredientToFridge } = fridgeSlice.actions;
export default fridgeSlice.reducer;
