import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../redux/commonUISlice";
import { updateRecipeInState } from "../../redux/recipeSlice";
import { Recipe } from "../../types";


interface EditRecipeParams {
  id: string;
  updatedData: Partial<Recipe>;
}

const editRecipe = async ({ id, updatedData }: EditRecipeParams): Promise<Recipe> => {
  const response = await api.put(`/recipe/${id}`, updatedData);
  return response.data.data;
};

export const useEditRecipe = (): UseMutationResult<Recipe, any, EditRecipeParams> => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  
  return useMutation<Recipe, any, EditRecipeParams>({
    mutationFn: editRecipe,
    onSuccess: (data: Recipe) => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      dispatch(updateRecipeInState(data));
      dispatch(
        setToastMessage({
          message: "레시피가 수정되었습니다",
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
