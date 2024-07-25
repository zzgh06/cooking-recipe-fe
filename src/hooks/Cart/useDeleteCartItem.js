import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";
import { setToastMessage } from "../../redux/commonUISlice";
import { useDispatch } from "react-redux";
import { removeCartItem } from "../../redux/cartSlice";


const deleteCartItem = async ({ ingredientId }) => {
  const response = await api.delete(`/cart/${ingredientId}`);
  return response.data.data;
};

export const useDeleteCartItem = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: deleteCartItem,
    onSuccess: (data) => {
      dispatch(removeCartItem(data));
      dispatch(
        setToastMessage({
          message: "상품이 삭제되었습니다",
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
