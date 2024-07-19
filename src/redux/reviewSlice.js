import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../utils/api";

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async ({ type, id, page, limit }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/review/${type}/${id}?page=${page}&limit=${limit}`);
      return response.data;
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

const calculateAverageRating = (reviews) => {
  if (reviews.length === 0) return 0;
  const totalRating = reviews?.reduce((acc, review) => acc + review?.rating, 0);
  return (totalRating / reviews?.length).toFixed(1);
};

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    averageRating: 0,
    totalReviews: 0,
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
        state.reviews = action.payload.reviews;
        state.totalReviews = action.payload.totalReviews;
        state.averageRating = calculateAverageRating(action.payload.allReviews);
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
        state.averageRating = calculateAverageRating(state.reviews);
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
        state.averageRating = calculateAverageRating(state.reviews);
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
        state.averageRating = calculateAverageRating(state.reviews);
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;
