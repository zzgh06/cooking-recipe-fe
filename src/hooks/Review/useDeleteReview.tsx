import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { removeReview } from "../../redux/reviewSlice";
import { setToastMessage } from "../../redux/commonUISlice";

interface DeleteReviewParams {
  id: string;
  type: string;
}

interface DeleteReviewResponse {
  id: string;
  deletedCount: number;
}

const deleteReview = async ({ id, type }: DeleteReviewParams): Promise<DeleteReviewResponse> => {
  const response = await api.delete(`/review/${type}/${id}`);
  return { id, deletedCount: response.data.deletedCount };
};

export const useDeleteReview = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useMutation<DeleteReviewResponse, Error, DeleteReviewParams>({
    mutationFn: deleteReview,
    onError: (error) => {
      console.error("Error deleting review:", error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] }); 
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
