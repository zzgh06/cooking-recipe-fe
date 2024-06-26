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

  const recipeSlice = createSlice({
    name: 'recipe',
    initialState: {
      recipes: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
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
        });
    },
  });
  
  export default recipeSlice.reducer;
