import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../utils/api';
import { useDispatch } from 'react-redux';
import { setToastMessage } from '../../redux/commonUISlice';

const deleteRecipeFavorite = async (id) => {
  const response = await api.delete(`/favorite/${id}`);
  return response.data;
};

export const useDeleteRecipeFavorite = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: deleteRecipeFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries(['recipeFavorite']);
      dispatch(
        setToastMessage({
          message: "레시피 찜을 취소했습니다.",
          status: "error",
        })
      );
    },
    onError: (error) => {
      console.error('Error removing recipe from favorites:', error.message);
    }
  });
};
