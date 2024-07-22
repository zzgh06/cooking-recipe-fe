import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import { setToastMessage } from "./commonUISlice";

export const getRecipeFavorite = createAsyncThunk(
  "favorite/getRecipeFavorite",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/favorite");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addRecipeFavorite = createAsyncThunk(
  "favorite/addRecipeFavorite",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put(`/favorite/${id}`);
      dispatch(
        setToastMessage({
          message: "레시피를 찜했습니다.",
          status: "success",
        })
      );
      dispatch(getRecipeFavorite());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteRecipeFavorite = createAsyncThunk(
  "favorite/deleteRecipeFavorite",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.delete(`/favorite/${id}`);
      dispatch(
        setToastMessage({
          message: "레시피를 찜을 취소했습니다.",
          status: "success",
        })
      );
      dispatch(getRecipeFavorite());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    loading: false,
    error: "",
    recipeFavorite: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecipeFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecipeFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.recipeFavorite = action.payload;
      })
      .addCase(getRecipeFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addRecipeFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRecipeFavorite.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addRecipeFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteRecipeFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRecipeFavorite.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteRecipeFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default favoriteSlice.reducer;
