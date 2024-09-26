import { useMutation, UseMutationResult } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../redux/commonUISlice";
import { addIngredientToState } from "../../redux/ingredientSlice";
import { Ingredient } from "../../types";

const createIngredient = async (ingredient: Ingredient): Promise<Ingredient> => {
  const response = await api.post("/ingredient", ingredient);
  return response.data.data;
};

export const useCreateIngredient = (): UseMutationResult<Ingredient, unknown, Ingredient> => {
  const dispatch = useDispatch();
  return useMutation<Ingredient, unknown, Ingredient>({
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
