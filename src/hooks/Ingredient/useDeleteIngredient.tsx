import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import api from '../../utils/api';
import { setToastMessage } from '../../redux/commonUISlice';
import { useDispatch } from 'react-redux';
import { removeIngredient } from '../../redux/ingredientSlice';
import { Ingredient } from '../../types';

const deleteIngredient = async (id: string): Promise<Ingredient> => {
  const response = await api.delete(`/ingredient/${id}`);
  return response.data;
};

export const useDeleteIngredient = (): UseMutationResult<Ingredient, unknown, string> => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation<Ingredient, unknown, string>({
    mutationFn: deleteIngredient,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['ingredients'] });
      dispatch(removeIngredient({ ingredient: data }))
      dispatch(
        setToastMessage({
          message: "재료가 삭제됐습니다",
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
