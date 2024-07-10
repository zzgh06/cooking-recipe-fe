import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import ingredientReducer from "./ingredientSlice";
import recipeReducer from "./recipeSlice";
import fridgeReducer from "./fridgeSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";
import reviewReducer from "./reviewSlice";
import commonUiReducer from "./commonUISlice";
import favoriteReducer from "./favoriteSlice";
export const store = configureStore({
  reducer: {
    auth: userReducer,
    ingredients: ingredientReducer,
    recipe: recipeReducer,
    order: orderReducer,
    fridge: fridgeReducer,
    cart: cartReducer,
    review: reviewReducer,
    favorite: favoriteReducer,
    ui: commonUiReducer,
  },
});

store.subscribe(() => {
  console.log("Current ui state", store.getState().ui);
  //console.log("Current auth state:", store.getState().auth);
  //console.log("Current recipe state:", store.getState().recipe);
  //console.log("Current review state:", store.getState().review);
  //console.log("Current order state:", store.getState().order);
});
