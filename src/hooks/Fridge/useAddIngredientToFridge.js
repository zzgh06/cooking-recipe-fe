import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../utils/api';
import { useDispatch } from 'react-redux';
import { setAddIngredientToFridge } from '../../redux/fridgeSlice';
import { setToastMessage } from '../../redux/commonUISlice';

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
      dispatch(setToastMessage({
        message: error.error,
        status: "error"
      }))
    }
  });
};
