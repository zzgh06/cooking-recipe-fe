import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../redux/commonUISlice";
import { removeIngredientToFridge } from "../../redux/fridgeSlice";
import { FridgeItem } from "../../types";

interface DeleteFridgeResponse {
  userFrige: FridgeItem[];
}

const deleteFridgeItem = async (id: string): Promise<FridgeItem[]> => {
  const response = await api.delete<DeleteFridgeResponse>(`/frige/${id}`);
  return response.data.userFrige;
};

export const useDeleteFridgeItem = ():UseMutationResult<FridgeItem[], unknown, string> => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation<FridgeItem[], unknown, string>({
    mutationFn: deleteFridgeItem,
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['fridgeItems']});
      dispatch(removeIngredientToFridge(data));
    },
    onError: (error: any) => {
      dispatch(
        setToastMessage({
          message: error.message || "오류가 발생했습니다",
          status: "error",
        })
      );
    },
  });
};