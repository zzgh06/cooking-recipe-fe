import { createSlice } from "@reduxjs/toolkit";

const calculateAverageRating = (reviews) => {
  if (reviews?.length === 0) return 0;
  const totalRating = reviews?.reduce((acc, review) => acc + review?.rating, 0);
  return (totalRating / reviews?.length).toFixed(1);
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    averageRating: 0,
    totalReviews: 0,
  },
  reducers: {
    setReviews: (state, action) => {
      state.reviews = action.payload?.reviews;
      state.totalReviews = action.payload?.totalReviews;
      state.averageRating = calculateAverageRating(action.payload?.allReviews);
    },
    setAddToReview: (state, action) => {
      state.reviews.push(action.payload);
      state.averageRating = calculateAverageRating(state.reviews);
    },
    removeReview: (state, action) => {
      state.reviews = state.reviews?.filter(
        (review) => review._id !== action.payload.id
      );
      state.averageRating = calculateAverageRating(state.reviews);
    },
    updateReviewToState: (state, action) => {
      state.loading = false;
        const index = state.reviews.findIndex(
          (review) => review._id === action.payload._id
        );
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
        state.averageRating = calculateAverageRating(state.reviews);
    }
  },
});
export const {
  setReviews,
  setAddToReview,
  removeReview,
  updateReviewToState
} = reviewSlice.actions;
export default reviewSlice.reducer;
