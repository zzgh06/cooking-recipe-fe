import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import ingredientReducer from './ingredientSlice';
import recepiReducer from './userSlice';

export const store = configureStore({
  reducer: {
    auth: userReducer,
    ingredients: ingredientReducer,
    recepi : recepiReducer,
  },
});

store.subscribe(() => {
  console.log('Current state:', store.getState().auth);
});