import { useMutation } from '@tanstack/react-query';
import api from '../../utils/api';
import { useDispatch } from 'react-redux';
import { setToastMessage } from '../../redux/commonUISlice';
import { removeRecipe } from '../../redux/recipeSlice';

const deleteRecipe = async (id) => {
  await api.delete(`/recipe/${id}`);
  return id;
};

export const useDeleteRecipe = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: deleteRecipe,
    onSuccess: (id) => {
      removeRecipe(id)
      dispatch(
        setToastMessage({
          message: "레시피가 삭제되었습니다",
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
    }
  });
};
