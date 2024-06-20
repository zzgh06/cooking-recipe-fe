import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import ingredientReducer from './ingredientSlice';

export const store = configureStore({
  reducer: {
    auth: userReducer,
    ingredients: ingredientReducer,
  },
});
