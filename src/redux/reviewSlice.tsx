import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Review } from "../types";

interface ReviewState {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

interface SetReviewsPayload {
  reviews: Review[];
  totalReviews: number;
  allReviews: Review[];
}

const calculateAverageRating = (reviews: Review[] | undefined): number => {
  if (!reviews || reviews.length === 0) return 0;
  const totalRating = reviews.reduce((acc, review) => acc + (review?.rating || 0), 0);
  return Number((totalRating / reviews.length).toFixed(1));
};

const initialState: ReviewState = {
  reviews: [],
  averageRating: 0,
  totalReviews: 0,
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<SetReviewsPayload>) => {
      const { reviews, totalReviews, allReviews } = action.payload;
      state.reviews = reviews;
      state.totalReviews = totalReviews;
      state.averageRating = calculateAverageRating(allReviews);
    },
    setAddToReview: (state, action: PayloadAction<Review>) => {
      state.reviews.push(action.payload);
      state.averageRating = calculateAverageRating(state.reviews);
    },
    removeReview: (state, action: PayloadAction<{ id: string }>) => {
      state.reviews = state.reviews.filter(
        (review) => review._id !== action.payload.id
      );
      state.averageRating = calculateAverageRating(state.reviews);
    },
    updateReviewToState: (state, action: PayloadAction<Review>) => {
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
