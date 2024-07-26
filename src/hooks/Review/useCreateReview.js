import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { setAddToReview } from "../../redux/reviewSlice";

const createReview = async ({ type, userId, recipeId, comment, rating }) => {
  const response = await api.post(`/review/${type}`, { userId, recipeId, comment, rating });
  console.log("response", response.data)
  return response.data.data;
};

export const useCreateReview = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: createReview,
    onError: (error) => {
      console.error("Error creating review:", error);
    },
    onSuccess: (data) => {
      dispatch(setAddToReview(data))
    },
  });
};
