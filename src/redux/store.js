import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import ingredientReducer from './ingredientSlice';
import fridgeReducer from './fridgeSlice';
import recepiReducer from './userSlice';

export const store = configureStore({
  reducer: {
    auth: userReducer,
    ingredients: ingredientReducer,
    fridge: fridgeReducer,
    recepi : recepiReducer,
  },
});

store.subscribe(() => {
  console.log('Current state:', store.getState().auth);
});