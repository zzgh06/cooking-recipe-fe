import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../redux/commonUISlice";
import { addRecipeToState } from "../../redux/recipeSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { Recipe } from "../../types";

interface RecipeResponse {
  recipe: Recipe;
}

const createRecipe = async (recipeData: Recipe): Promise<Recipe> => {
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
  const queryClient = useQueryClient();
  const location = useLocation();

  return useMutation({
    mutationFn: createRecipe,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] })
      dispatch(addRecipeToState(data));
      dispatch(
        setToastMessage({
          message: "레시피가 생성되었습니다",
          status: "success",
        })
      );
      if (location.pathname.includes("/admin/recipe")) {
        navigate("/admin/recipe");
      } else {
        navigate("/");
      }
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