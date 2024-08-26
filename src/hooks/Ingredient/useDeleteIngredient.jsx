import { useMutation } from '@tanstack/react-query';
import api from '../../utils/api';
import { setToastMessage } from '../../redux/commonUISlice';
import { useDispatch } from 'react-redux';
import { removeIngredient } from '../../redux/ingredientSlice';

const deleteIngredient = async (id) => {
  const response = await api.delete(`/ingredient/${id}`);
  return response.data;
};

export const useDeleteIngredient = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: deleteIngredient,
    onSuccess: (data) => {
      dispatch(removeIngredient(data))
      dispatch(
        setToastMessage({
          message: "재료가 삭제됐습니다",
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
