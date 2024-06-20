// src/slices/ingredientSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', async (searchQuery) => {
  const response = await fetch(`/api/ingredients?name=${searchQuery.name}&page=${searchQuery.page}`);
  return response.json();
});

export const createIngredient = createAsyncThunk('ingredients/createIngredient', async (ingredient) => {
  const response = await fetch('/api/ingredients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ingredient),
  });
  return response.json();
});

export const editIngredient = createAsyncThunk('ingredients/editIngredient', async ({ id, ingredient }) => {
  const response = await fetch(`/api/ingredients/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ingredient),
  });
  return response.json();
});

export const deleteIngredient = createAsyncThunk('ingredients/deleteIngredient', async (id) => {
  const response = await fetch(`/api/ingredients/${id}`, { method: 'DELETE' });
  return response.json();
});


const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState: {
    ingredients: [],
    totalPages: 0,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ingredients = action.payload.ingredients;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createIngredient.fulfilled, (state, action) => {
        state.ingredients.push(action.payload);
      })
      .addCase(editIngredient.fulfilled, (state, action) => {
        const index = state.ingredients.findIndex(ingredient => ingredient.id === action.payload.id);
        state.ingredients[index] = action.payload;
      })
      .addCase(deleteIngredient.fulfilled, (state, action) => {
        state.ingredients = state.ingredients.filter(ingredient => ingredient.id !== action.payload.id);
      });
  },
});

export default ingredientSlice.reducer;
