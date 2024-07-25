import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../utils/api';
import { useDispatch } from 'react-redux';
import { setToastMessage } from '../../redux/commonUISlice';
import { removeIngredientToFridge } from '../../redux/fridgeSlice';

const deleteFridgeItem = async (id) => {
  const response = await api.delete(`/frige/${id}`);
  return response.data.data.userFrige;
};

export const useDeleteFridgeItem = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: deleteFridgeItem,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['fridgeItems']);
      dispatch(removeIngredientToFridge(data))
    },
    onError: (error) => {
      dispatch(
        setToastMessage({
          message: error.error,
          status: "error",
        })
      );
    }
  });
};
