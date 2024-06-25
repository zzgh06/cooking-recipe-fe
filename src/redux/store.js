import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import ingredientReducer from './ingredientSlice';
import fridgeReducer from './fridgeSlice';
export const store = configureStore({
  reducer: {
    auth: userReducer,
    ingredients: ingredientReducer,
    fridge: fridgeReducer
  },
});

store.subscribe(() => {
  console.log('Current auth state:', store.getState().auth);
});