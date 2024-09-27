import { useMutation, UseMutationResult } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../redux/commonUISlice";
import { addRecipeToState } from "../../redux/recipeSlice";
import { useNavigate } from "react-router-dom";
import { Recipe } from "../../types";

interface RecipeResponse {
  recipe: Recipe;
}

const createRecipe = async (recipeData : Recipe): Promise<Recipe> => {
  const response = await api.post<RecipeResponse>("/recipe", recipeData);
  return response.data.recipe;
};

export const useCreateRecipe = (): UseMutationResult<
  Recipe,
  unknown,
  Recipe
> => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createRecipe,
    onSuccess: (data) => {
      dispatch(addRecipeToState(data));
      dispatch(
        setToastMessage({
          message: "레시피가 생성되었습니다",
          status: "success",
        })
      );
      navigate("/");
    },
    onError: (error: any) => {
      dispatch(
        setToastMessage({
          message: error.message || "레시피 생성 중 오류가 발생했습니다",
          status: "error",
        })
      );
    },
  });
};