import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { updateReviewToState } from "../../redux/reviewSlice";
import { Review } from "../../types";

interface UpdateReviewParams {
  id: string;
  type: string;
  comment: string;
  rating: number;
}

const updateReview = async ({ id, type, comment, rating }: UpdateReviewParams): Promise<Review> => {
  const response = await api.put(`/review/${type}/${id}`, { comment, rating });
  return response.data.data;
};

export const useUpdateReview = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation<Review, Error, UpdateReviewParams>({
    mutationFn: updateReview,
    onError: (error) => {
      console.error("Error updating review:", error);
    },
    onSuccess: (data) => {
      dispatch(updateReviewToState(data));
      queryClient.invalidateQueries({queryKey: ['reviews']}); 
    },
  });
};
