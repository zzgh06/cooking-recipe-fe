import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import ingredientReducer from "./ingredientSlice";
import recipeReducer from "./userSlice";
import orderReducer from "./orderSlice";
export const store = configureStore({
  reducer: {
    auth: userReducer,
    ingredients: ingredientReducer,
    recipe: recipeReducer,
    order: orderReducer,
  },
});

store.subscribe(() => {
  console.log("Current state:", store.getState().auth);
});
