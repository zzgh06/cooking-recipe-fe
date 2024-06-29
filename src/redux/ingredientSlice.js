import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import { setToastMessage } from "./commonUISlice";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async (searchQuery) => {
    const response = await api.get("/ingredient", {
      params: { ...searchQuery },
    });
    return response.data;
  }
);

export const getIngredient = createAsyncThunk(
  "ingredients/getIngredient",
  async (id) => {
    const response = await api.get(`/ingredient/${id}`);
    return response.data;
  }
);

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

const ingredientSlice = createSlice({
  name: "ingredients",
  initialState: {
    ingredients: [],
    selectedIngredient: null,
    totalPages: 0,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ingredients = action.payload.data.ingredients;
        state.totalPages = action.payload.data.totalPageNum;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
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
      .addCase(getIngredient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getIngredient.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedIngredient = action.payload.ingredient;
      })
      .addCase(getIngredient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default ingredientSlice.reducer;
