import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import { setToastMessage } from "./commonUISlice";

export const createIngredient = createAsyncThunk(
  "ingredients/createIngredient",
  async (ingredient, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/ingredient", ingredient);
      dispatch(
        setToastMessage({
          message: "재료가 추가됐습니다",
          status: "success",
        })
      );
      return response.data;
    } catch (error) {
      dispatch(
        setToastMessage({
          message: error.error,
          status: "error",
        })
      );

      return rejectWithValue(error.message);
    }
  }
);

export const editIngredient = createAsyncThunk(
  "ingredients/editIngredient",
  async ({ id, ingredient }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put(`/ingredient/${id}`, ingredient);
      dispatch(
        setToastMessage({
          message: "재료가 수정됐습니다",
          status: "success",
        })
      );
      return response.data;
    } catch (error) {
      dispatch(
        setToastMessage({
          message: error.error,
          status: "error",
        })
      );

      return rejectWithValue(error.message);
    }
  }
);

export const deleteIngredient = createAsyncThunk(
  "ingredients/deleteIngredient",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.delete(`/ingredient/${id}`);
      dispatch(
        setToastMessage({
          message: "재료가 삭제됐습니다",
          loading: "success",
        })
      );
      return response.data;
    } catch (error) {
      dispatch(
        setToastMessage({
          message: error.error,
          loading: "error",
        })
      );

      return rejectWithValue(error.message);
    }
  }
);

const ingredientSlice = createSlice({
  name: "ingredients",
  initialState: {
    ingredients: [],
    selectedIngredients: null,
    selectedShoppingList: [],
    completedShoppingList: [],
    totalPages: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedIngredients: (state, action) => {
      state.selectedIngredients = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createIngredient.fulfilled, (state, action) => {
        state.ingredients.push(action.payload.data);
      })
      .addCase(editIngredient.fulfilled, (state, action) => {
        const index = state.ingredients.findIndex(
          (ingredient) => ingredient._id === action.payload.ingredient._id
        );
        if (index !== -1) {
          state.ingredients[index] = action.payload.ingredient;
        }
      })
      .addCase(deleteIngredient.fulfilled, (state, action) => {
        state.ingredients = state.ingredients.filter(
          (ingredient) => ingredient._id !== action.payload.ingredient._id
        );
      })
  },
});

export const {
  setSelectedIngredients,
} = ingredientSlice.actions;

export default ingredientSlice.reducer;
