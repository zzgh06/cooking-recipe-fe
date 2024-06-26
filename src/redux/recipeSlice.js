import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../utils/api";

export const createRecipe = createAsyncThunk(
    'recipe/createRecipe',
    async (recipeData, { rejectWithValue }) => {
      try {
        const response = await api.post('/recipe', recipeData);
        console.log("response",response)
        return response.data.recipe;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const fetchRecipes = createAsyncThunk(
    'recipe/fetchRecipes',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get('/recipe');
        console.log("fetchRecipes", response)
        return response.data.data; 
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const fetchRecipeById = createAsyncThunk(
    'recipe/fetchRecipeById',
    async (id, { rejectWithValue }) => {
      try {
        const response = await api.get(`/recipe/${id}`);
        return response.data.data; 
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  const recipeSlice = createSlice({
    name: 'recipe',
    initialState: {
      recipes: [],
      recipeDetail: null,
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        console.log("fetchRecipes.fulfilled", action.payload);
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
        .addCase(createRecipe.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createRecipe.fulfilled, (state, action) => {
          state.loading = false;
          state.recipes.push(action.payload);
        })
        .addCase(createRecipe.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(fetchRecipeById.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchRecipeById.fulfilled, (state, action) => {
          console.log("fetchRecipeById.fulfilled", action.payload);
          state.loading = false;
          state.recipeDetail = action.payload;
        })
        .addCase(fetchRecipeById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
    },
    
  });
  
  export default recipeSlice.reducer;
