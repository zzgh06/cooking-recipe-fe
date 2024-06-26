import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import ingredientReducer from './ingredientSlice';
import recipeReducer from './recipeSlice';

export const store = configureStore({
  reducer: {
    auth: userReducer,
    ingredients: ingredientReducer,
    recipe: recipeReducer,
  },
});

store.subscribe(() => {
  console.log('Current state:', store.getState().auth);
  console.log('Current recipe state:', store.getState().recipe); // recipe 상태 출력
});