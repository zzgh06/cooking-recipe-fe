import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import ingredientReducer from './ingredientSlice';
import fridgeReducer from './fridgeSlice';
import recepiReducer from './recepiSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    auth: userReducer,
    ingredients: ingredientReducer,
    fridge: fridgeReducer,
    recepi : recepiReducer,
    cart: cartReducer
  },
});

store.subscribe(() => {
  console.log('Current state:', store.getState().auth);
});