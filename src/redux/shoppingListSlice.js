import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

export const fetchShoppingList = createAsyncThunk(
  "shoppingList/fetchShoppingList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("shoppingList/me");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToShoppingList = createAsyncThunk(
  "shoppingList/addToShoppingList",
  async (items, { rejectWithValue }) => {
    try {
      const response = await api.post("shoppingList/add", { items });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromShoppingList = createAsyncThunk(
  "shoppingList/removeFromShoppingList",
  async (itemId, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("shoppingList/remove", { itemId });
      dispatch(fetchShoppingList())
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const moveToCompletedList = createAsyncThunk(
  "shoppingList/moveToShoppingList",
  async (item, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("shoppingList/moveToShoppingList", { item });
      dispatch(fetchShoppingList())
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState: {
    selectedShoppingList: [],
    completedShoppingList: [],
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
      .addCase(fetchShoppingList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShoppingList.fulfilled, (state, action) => {
        console.log("Fetched shopping list data:", action.payload);
        state.selectedShoppingList = action.payload.filter(item => !item.completed);
        state.completedShoppingList = action.payload.filter(item => item.completed);
        state.loading = false;
      })
      .addCase(fetchShoppingList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToShoppingList.fulfilled, (state, action) => {
        state.selectedShoppingList = action.payload;
      })
      .addCase(removeFromShoppingList.fulfilled, (state, action) => {
        state.selectedShoppingList = state.selectedShoppingList.filter(
          (item) => !action.payload.some((p) => p._id === item._id)
        );
        state.completedShoppingList = state.completedShoppingList.filter(
          (item) => !action.payload.some((p) => p._id === item._id)
        );
      })
      .addCase(moveToCompletedList.fulfilled, (state, action) => {
        state.selectedShoppingList = state.selectedShoppingList.filter(
          (item) => !action.payload.some((p) => p._id === item._id)
        );
        state.completedShoppingList = state.completedShoppingList.concat(
          action.payload.filter((item) => item.completed)
        );
      });      
    }
});

export default shoppingListSlice.reducer;
