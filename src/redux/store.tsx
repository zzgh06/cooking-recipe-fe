import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import ingredientReducer from "./ingredientSlice";
import recipeReducer from "./recipeSlice";
import fridgeReducer from "./fridgeSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";
import reviewReducer from "./reviewSlice";
import commonUiReducer from "./commonUISlice";
import shoppingListReducer from "./shoppingListSlice";
export const store = configureStore({
  reducer: {
    auth: userReducer,
    ingredients: ingredientReducer,
    recipe: recipeReducer,
    order: orderReducer,
    fridge: fridgeReducer,
    cart: cartReducer,
    review: reviewReducer,
    shoppingList: shoppingListReducer,
    ui: commonUiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;