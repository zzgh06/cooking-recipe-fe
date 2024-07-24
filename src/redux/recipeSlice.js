import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    recipes: [],
  },
  reducers: {
    addRecipeToState: (state, action) => {
      state.recipes.push(action.payload);
    },
    updateRecipeInState: (state, action) => {
      const updatedRecipe = action.payload;
      const index = state.recipes.findIndex(
        (recipe) => recipe._id === updatedRecipe._id
      );
      if (index !== -1) {
        state.recipes[index] = updatedRecipe;
      } else {
        console.error('Recipe not found with ID:', updatedRecipe._id);
      }
    },
    removeRecipe: (state, action) => {
      state.recipes = state.recipes.filter(
        (recipe) => recipe._id !== action.payload
      );
    },
  }
});

export const { addRecipeToState, updateRecipeInState, removeRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
