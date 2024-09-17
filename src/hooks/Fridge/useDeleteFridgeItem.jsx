import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../redux/commonUISlice";
import { removeIngredientToFridge } from "../../redux/fridgeSlice";

const deleteFridgeItem = async (id) => {
  const response = await api.delete(`/frige/${id}`);
  return response.data.userFrige;
};

export const useDeleteFridgeItem = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFridgeItem,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['fridgeItems']);
      dispatch(removeIngredientToFridge(data));
    },
    onError: (error) => {
      dispatch(
        setToastMessage({
          message: error.message || "오류가 발생했습니다",
          status: "error",
        })
      );
    },
  });
};