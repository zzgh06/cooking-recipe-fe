import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import ingredientReducer from './ingredientSlice';
import recipeReducer from './recipeSlice';
import fridgeReducer from './fridgeSlice';
import reviewReducer from './reviewSlice'

export const store = configureStore({
  reducer: {
    auth: userReducer,
    ingredients: ingredientReducer,
    recipe: recipeReducer,
    fridge: fridgeReducer,  
    review: reviewReducer,
  },
});

store.subscribe(() => {
  console.log('Current state:', store.getState().auth);
  console.log('Current recipe state:', store.getState().recipe); 
  console.log('Current review state:', store.getState().review); 
});