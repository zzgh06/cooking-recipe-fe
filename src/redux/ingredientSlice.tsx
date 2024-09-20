import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Ingredient {
  _id: string;
  name: string;
  images?: string[];
  price?: number;
  qty?: number;
  unit?: string;
  totalSales?: number;
}

interface IngredientState {
  ingredients: Ingredient[];
  selectedIngredients: Ingredient[]; 
}

const initialState: IngredientState = {
  ingredients: [],
  selectedIngredients: [],
};

const ingredientSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setSelectedIngredients: (state, action: PayloadAction<Ingredient[]>) => {
      console.log(action.payload)
      state.selectedIngredients = action.payload;
    },
    addIngredientToState: (state, action: PayloadAction<Ingredient>) => {
      state.ingredients.push(action.payload);
    },
    updateIngredientInState: (state, action: PayloadAction<{ ingredient: Ingredient }>) => {
      const updatedIngredient = action.payload.ingredient;
      const index = state.ingredients.findIndex(
        (ingredient) => ingredient._id === updatedIngredient._id
      );
      if (index !== -1) {
        state.ingredients[index] = updatedIngredient;
      }
    },
    removeIngredient: (state, action: PayloadAction<{ ingredient: Ingredient }>) => {
      const removeIngredientId = action.payload.ingredient._id;
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient._id !== removeIngredientId
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
