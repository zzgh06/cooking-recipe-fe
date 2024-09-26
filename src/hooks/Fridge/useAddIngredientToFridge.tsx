import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import api from '../../utils/api';
import { useDispatch } from 'react-redux';
import { setAddIngredientToFridge } from '../../redux/fridgeSlice';
import { setToastMessage } from '../../redux/commonUISlice';
import { FridgeItem } from '../../types';

interface AddIngredientResponse {
  userFrige: FridgeItem[];
}


const addIngredientToFridge = async (ingredientId: string): Promise<FridgeItem[]> => {
  const response = await api.post<AddIngredientResponse>("/frige", { items: [{ ingredientId }] });
  return response.data.userFrige;
};

export const useAddIngredientToFridge = (): UseMutationResult<FridgeItem[], unknown, string> => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation<FridgeItem[], unknown, string>({
    mutationFn: addIngredientToFridge,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['fridgeItems'] });
      dispatch(setAddIngredientToFridge(data));
    },
    onError: (error: any) => {
      dispatch(setToastMessage({
        message: error.error,
        status: "error"
      }))
    }
  });
};
