import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import ingredientReducer from "./ingredientSlice";
import recipeReducer from "./recipeSlice";
import fridgeReducer from "./fridgeSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";
export const store = configureStore({
  reducer: {
    auth: userReducer,
    ingredients: ingredientReducer,
    recipe: recipeReducer,
    order: orderReducer,
    fridge: fridgeReducer,
    cart: cartReducer,
  },
});

store.subscribe(() => {
  console.log("Current state:", store.getState().auth);
  console.log("Current recipe state:", store.getState().recipe);
});
