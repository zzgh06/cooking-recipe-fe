import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../redux/commonUISlice";
import { addIngredientToState } from "../../redux/ingredientSlice";

const createIngredient = async (ingredient) => {
  const response = await api.post("/ingredient", ingredient);
  return response.data.data;
};

export const useCreateIngredient = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: createIngredient,
    onSuccess: (data) => {
      dispatch(addIngredientToState(data))
      dispatch(
        setToastMessage({
          message: "재료(상품) 추가됐습니다",
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
