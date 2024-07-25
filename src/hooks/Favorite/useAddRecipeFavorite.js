import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../utils/api';
import { useDispatch } from 'react-redux';
import { setToastMessage } from '../../redux/commonUISlice';

const addRecipeFavorite = async (id) => {
  const response = await api.put(`/favorite/${id}`);
  return response.data;
};

export const useAddRecipeFavorite = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: addRecipeFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries(['recipeFavorite']);
      dispatch(
        setToastMessage({
          message: "레시피를 찜했습니다.",
          status: "success",
        })
      );
    },
    onError: (error) => {
      console.error('Error adding recipe to favorites:', error.message);
    }
  });
};
