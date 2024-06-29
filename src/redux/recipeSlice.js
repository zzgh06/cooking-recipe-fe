import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import { setToastMessage } from "./commonUISlice";

export const createRecipe = createAsyncThunk(
  "recipe/createRecipe",
  async (recipeData, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/recipe", recipeData);
      dispatch(
        setToastMessage({
          message: "레시피가 생성되었습니다",
          status: "success",
        })
      );
      return response.data.recipe;
    } catch (err) {
      dispatch(
        setToastMessage({
          message: err.error,
          status: "error",
        })
      );
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async (searchQuery) => {
    const response = await api.get(
      `/ingredient?name=${searchQuery.name}&page=${searchQuery.page}`
    );
    return response.data;
  }
);

export const fetchRecipes = createAsyncThunk(
  "recipe/fetchRecipes",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/recipe?name=${searchQuery.name}&page=${searchQuery.page}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchRecipeById = createAsyncThunk(
  "recipe/fetchRecipeById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/recipe/${id}`);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const editRecipe = createAsyncThunk(
  "recipe/editRecipe",
  async ({ id, updatedData }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put(`/recipe/${id}`, updatedData);
      dispatch(
        setToastMessage({
          message: "레시피가 수정되었습니다",
          status: "success",
        })
      );
      return response.data.data;
    } catch (err) {
      dispatch(
        setToastMessage({
          message: err.error,
          status: "error",
        })
      );
      //console.error("API Error:", err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteRecipe = createAsyncThunk(
  "recipe/deleteRecipe",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.delete(`/recipe/${id}`);
      dispatch(
        setToastMessage({
          message: "레시피가 삭제되었습니다",
          status: "success",
        })
      );
      return id;
    } catch (err) {
      dispatch(
        setToastMessage({
          message: err.error,
          status: "error",
        })
      );
      return rejectWithValue(err.response.data);
    }
  }
);

const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    recipes: [],
    recipeDetail: null,
    totalPages: 0,
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
        state.loading = false;
        state.recipes = action.payload.data;
        state.totalPages = action.payload.totalPageNum;
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
        state.loading = false;
        state.recipeDetail = action.payload;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editRecipe.pending, (state) => {
        state.loading = true;
      })
      .addCase(editRecipe.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload._id) {
          const index = state.recipes.findIndex(
            (recipe) => recipe._id === action.payload._id
          );
          if (index !== -1) {
            state.recipes[index] = action.payload;
          } else {
            console.error("Recipe not found with ID:", action.payload._id);
          }
        } else {
          console.error("Invalid payload:", action.payload);
        }
      })
      .addCase(editRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteRecipe.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = state.recipes.filter(
          (recipe) => recipe._id !== action.payload
        );
      })
      .addCase(deleteRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default recipeSlice.reducer;
