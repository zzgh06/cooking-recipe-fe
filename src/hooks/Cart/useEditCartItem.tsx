import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../redux/commonUISlice";
import { updateCartItemState } from "../../redux/cartSlice";
import { CartItemType } from "../../types";

interface editCartItemParams {
  ingredientId : string;
  qty : number;
}

const editCartItem = async ({ ingredientId, qty }: editCartItemParams): Promise<CartItemType> => {
  const response = await api.put(`/cart/${ingredientId}`, { qty });
  return response.data.data;
};

export const useEditCartItem = (): UseMutationResult<CartItemType, unknown, editCartItemParams> => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation<CartItemType, unknown, editCartItemParams>({
    mutationFn: editCartItem,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey : ["cart"] });
      dispatch(updateCartItemState(data));
      dispatch(
        setToastMessage({
          message: "수량이 변경 되었습니다",
          status: "success",
        })
      );
    },
    onError: (error: any) => {
      dispatch(
        setToastMessage({
          message: error.error,
          status: "error",
        })
      );
    },
  });
};
