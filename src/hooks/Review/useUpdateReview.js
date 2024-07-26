import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { updateReviewToState } from "../../redux/reviewSlice";

const updateReview = async ({ id, type, comment, rating }) => {
  const response = await api.put(`/review/${type}/${id}`, { comment, rating });
  return response.data.data;
};

export const useUpdateReview = () => {
  const dispatch = useDispatch()
  return useMutation({
    mutationFn: updateReview,
    onError: (error) => {
      console.error("Error updating review:", error);
    },
    onSuccess: (data) => {
      dispatch(updateReviewToState(data))
    },
  });
};
