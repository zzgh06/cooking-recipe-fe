import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../utils/api';
import { useDispatch } from 'react-redux';
import { setAddIngredientToFridge } from '../../redux/fridgeSlice';

const addIngredientToFridge = async (ingredientId) => {
  const response = await api.post("/frige", { items: [{ ingredientId }] });
  return response.data.userFrige;
};

export const useAddIngredientToFridge = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addIngredientToFridge,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['fridgeItems']);
      dispatch(setAddIngredientToFridge(data))
    },
    onError: (error) => {
      console.error('Error adding ingredient to fridge:', error);
    }
  });
};
