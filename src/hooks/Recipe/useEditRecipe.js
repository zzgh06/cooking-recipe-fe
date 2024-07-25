import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../redux/commonUISlice";
import { updateRecipeInState } from "../../redux/recipeSlice";

const editRecipe = async ({ id, updatedData }) => {
  const response = await api.put(`/recipe/${id}`, updatedData);
  return response.data.data;
};

export const useEditRecipe = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: editRecipe,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['recipes']);
      dispatch(updateRecipeInState(data));
      dispatch(
        setToastMessage({
          message: "레시피가 수정되었습니다",
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
