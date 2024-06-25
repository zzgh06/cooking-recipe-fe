import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

export const addIngredientToFridge = createAsyncThunk(
  "fridge/addIngredientToFridge",
  async (ingredientId, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/frige", { items: [{ ingredientId }] });
      dispatch(fetchFridgeItems());
      return response.data.userFrige;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFridgeItems = createAsyncThunk(
  "fridge/fetchFridgeItems",
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get("/frige", { params: query });
      return response.data.data.userFrige;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  fridgeItems: [],
  error: null,
};

const fridgeSlice = createSlice({
  name: "fridge",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    addIngredientToState: (state, action) => {
      state.fridgeItems.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addIngredientToFridge.pending, (state) => {
        state.error = null;
      })
      .addCase(addIngredientToFridge.fulfilled, (state, action) => {
        state.fridgeItems = action.payload; 
        state.error = null;
      })
      .addCase(addIngredientToFridge.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchFridgeItems.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchFridgeItems.fulfilled, (state, action) => {
        state.fridgeItems = action.payload;
        state.error = null;
      })
      .addCase(fetchFridgeItems.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setError, addIngredientToState } = fridgeSlice.actions;
export default fridgeSlice.reducer;