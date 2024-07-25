import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../redux/commonUISlice";
import { updateCartItemState } from "../../redux/cartSlice";

const editCartItem = async ({ ingredientId, qty }) => {
  const response = await api.put(`/cart/${ingredientId}`, { qty });
  return response.data.data;
};

export const useEditCartItem = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editCartItem,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["cart"]);
      dispatch(updateCartItemState(data));
      dispatch(
        setToastMessage({
          message: "수량이 변경 되었습니다",
          status: "success",
        })
      );
    },
    onError: (error) => {
      dispatch(
        setToastMessage({
          message: error.error,
          status: "error",
        })
      );
    },
  });
};
