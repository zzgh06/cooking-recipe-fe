import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { removeReview } from "../../redux/reviewSlice";
import { setToastMessage } from "../../redux/commonUISlice";

const deleteReview = async ({ id, type }) => {
  const response = await api.delete(`/review/${type}/${id}`);
  return { id, deletedCount: response.data.deletedCount };
};

export const useDeleteReview = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteReview,
    onError: (error) => {
      console.error("Error deleting review:", error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['reviews']);
      dispatch(removeReview(data))
      dispatch(
        setToastMessage({
          message: "리뷰를 삭제하였습니다",
          status: "success",
        })
      );
    },
  });
};
