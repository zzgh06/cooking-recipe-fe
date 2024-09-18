import { useMutation, UseMutationResult } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../redux/commonUISlice";
import { setAddToCart } from "../../redux/cartSlice";
import { CartItemType } from "../../types";

interface AddItemToCartParams {
  ingredientId: string;
  qty: number;
}

const addItemToCart = async ({ ingredientId, qty }: AddItemToCartParams): Promise<CartItemType> => {
  const response = await api.post(`/cart`, { ingredientId, qty });
  return response.data.data;
};

export const useAddToCart = (): UseMutationResult<CartItemType, unknown, AddItemToCartParams> => {
  const dispatch = useDispatch();
  
  return useMutation<CartItemType, unknown, AddItemToCartParams>({
    mutationFn: addItemToCart,
    onSuccess: (data: CartItemType) => {
      dispatch(setAddToCart(data));
      dispatch(
        setToastMessage({
          message: "카트에 상품이 추가됐습니다",
          status: "success",
        })
      );
    },
    onError: (error: any) => {
      dispatch(
        setToastMessage({
          message: error?.message || "에러 발생",
          status: "error",
        })
      );
    },
  });
};
