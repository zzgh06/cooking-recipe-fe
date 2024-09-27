import { useMutation, UseMutationResult } from '@tanstack/react-query';
import api from '../../utils/api';
import { useDispatch } from 'react-redux';
import { setToastMessage } from '../../redux/commonUISlice';
import { removeRecipe } from '../../redux/recipeSlice';

type DeleteRecipeResponse = string;

const deleteRecipe = async (id: string): Promise<DeleteRecipeResponse> => {
  await api.delete(`/recipe/${id}`);
  return id;
};

export const useDeleteRecipe = (): UseMutationResult<DeleteRecipeResponse, any, string> => {
  const dispatch = useDispatch();
  
  return useMutation<DeleteRecipeResponse, any, string>({
    mutationFn: deleteRecipe,
    onSuccess: (id: string) => {
      dispatch(removeRecipe(id));
      dispatch(
        setToastMessage({
          message: "레시피가 삭제되었습니다",
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
