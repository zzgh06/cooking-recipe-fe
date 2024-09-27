import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { setAddToReview } from "../../redux/reviewSlice";
import { Review } from "../../types";

interface CreateReviewData {
  type: string;
  userId: string;
  recipeId: string;
  comment: string;
  rating: number;
}

const createReview = async ({ type, userId, recipeId, comment, rating }: CreateReviewData): Promise<Review> => {
  const response = await api.post(`/review/${type}`, { userId, recipeId, comment, rating });
  return response.data.data;
};

export const useCreateReview = (): UseMutationResult<
  Review,
  unknown,
  CreateReviewData
> => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: (data: Review) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] })
      dispatch(setAddToReview(data));
    },
    onError: (error: any) => {
      console.error("Error creating review:", error);
    },
  });
};