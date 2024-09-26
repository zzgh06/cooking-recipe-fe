import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../redux/commonUISlice";
import { updateIngredientInState } from "../../redux/ingredientSlice";
import { Ingredient } from "../../types";

interface EditIngredientParams {
  id: string;
  ingredient: Ingredient;
}

const editIngredient = async ({ id, ingredient }: EditIngredientParams): Promise<Ingredient> => {
  const response = await api.put(`/ingredient/${id}`, ingredient);
  return response.data;
};

export const useEditIngredient = (): UseMutationResult<Ingredient, Error, EditIngredientParams> => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation<Ingredient, Error, EditIngredientParams>({
    mutationFn: editIngredient,
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['ingredients']});
      dispatch(updateIngredientInState({ ingredient: data }));
      dispatch(
        setToastMessage({
          message: "재료가 수정됐습니다",
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
