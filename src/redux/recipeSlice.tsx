import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipe } from "../types";

interface RecipeState {
  recipes: Recipe[];
}

const initialState: RecipeState = {
  recipes: []
}

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    addRecipeToState: (state, action: PayloadAction<Recipe>) => {
      state.recipes.push(action.payload);
    },
    updateRecipeInState: (state, action: PayloadAction<Recipe>) => {
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
    removeRecipe: (state, action: PayloadAction<string>) => {
      state.recipes = state.recipes.filter(
        (recipe) => recipe._id !== action.payload
      );
    },
  }
});

export const { addRecipeToState, updateRecipeInState, removeRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
