import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../utils/api";

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async ({ type, id }, { rejectWithValue }) => {
    try {       
      const response = await api.get(`/review/${type}/${id}`);
      return response.data.reviews;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createReview = createAsyncThunk(
    'reviews/createReview',
    async ({ type, userId, recipeId, comment, rating }, { rejectWithValue }) => {
      try {
        const response = await api.post(`/review/${type}`, { userId, recipeId, comment, rating });
        return response.data.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const deleteReview = createAsyncThunk(
    'reviews/deleteReview',
    async ({ id, type }, { rejectWithValue }) => {
      try {
        const response = await api.delete(`/review/${type}/${id}`);
        return { id, deletedCount: response.data.deletedCount };
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const updateReview = createAsyncThunk(
    'reviews/updateReview',
    async ({ id,type, comment, rating }, { rejectWithValue }) => {
      try {
        const response = await api.put(`/review/${type}/${id}`, { comment, rating });
        return response.data.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = state.reviews.filter(review => review._id !== action.payload.id);
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.reviews.findIndex(review => review._id === action.payload._id);
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
  },
});


export default reviewSlice.reducer;
