import { useMutation, UseMutationResult } from "@tanstack/react-query";
import api from "../../utils/api";
import { setToastMessage } from "../../redux/commonUISlice";
import { useDispatch } from "react-redux";
import { removeCartItem } from "../../redux/cartSlice";
import { CartItemType } from "../../types";
import { useFetchCart } from "./useFetchCart";


interface DeleteCartItemParams {
  ingredientId: string;
}

const deleteCartItem = async ({ ingredientId }: DeleteCartItemParams): Promise<CartItemType> => {
  const response = await api.delete(`/cart/${ingredientId}`);
  return response.data.data;
};

export const useDeleteCartItem = (): UseMutationResult<CartItemType, Error, DeleteCartItemParams> => {
  const dispatch = useDispatch();
  const { refetch } = useFetchCart();  

  return useMutation<CartItemType, Error, DeleteCartItemParams>({
    mutationFn: deleteCartItem,
    onSuccess: async (data) => {
      dispatch(removeCartItem([data]));  
      await refetch(); 
      dispatch(
        setToastMessage({
          message: "상품이 삭제되었습니다",
          status: "success",
        })
      );
    },
    onError: (error: Error) => {
      dispatch(
        setToastMessage({
          message: error.message,
          status: "error",
        })
      );
    },
  });
};
