import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../redux/commonUISlice";
import { setAddToCart } from "../../redux/cartSlice";

const addItemToCart = async ({ ingredientId, qty }) => {
  const response = await api.post(`/cart`, { ingredientId, qty });
  return response.data.data;
};

export const useAddToCart = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: addItemToCart,
    onSuccess: (data) => {
      dispatch(setAddToCart(data));
      dispatch(
        setToastMessage({
          message: "카트에 상품이 추가됐습니다",
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
