import { createSlice } from "@reduxjs/toolkit";

const ingredientSlice = createSlice({
  name: "ingredients",
  initialState: {
    ingredients: [],
    selectedIngredients: null,
  },
  reducers: {
    setSelectedIngredients: (state, action) => {
      state.selectedIngredients = action.payload;
    },
    addIngredientToState: (state, action) => {
      state.recipes.push(action.payload);
    },
    updateIngredientInState: (state, action) => {
      const updatedIngredient = action.payload.ingredient;
      const index = state.ingredients.findIndex(
        (ingredient) => ingredient._id === updatedIngredient._id
      );
      if (index !== -1) {
        state.ingredients[index] = updatedIngredient;
      }
    },
    removeIngredient: (state, action) => {
      const removeIngredient = action.payload.ingredient._id;
      state.ingredients = state.ingredients.filter(
        (recipe) => recipe._id !== removeIngredient
      );
    },
  },
});

export const {
  setSelectedIngredients,
  addIngredientToState,
  updateIngredientInState,
  removeIngredient,
} = ingredientSlice.actions;

export default ingredientSlice.reducer;
