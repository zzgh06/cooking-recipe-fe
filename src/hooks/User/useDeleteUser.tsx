import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../utils/api';
import { useDispatch } from 'react-redux';
import { setToastMessage } from '../../redux/commonUISlice';

const deleteUser = async (id: string) => {
  await api.delete(`/user/${id}`);
};

export const useDeleteUser = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usersInfo'] });
      dispatch(setToastMessage({
        message: "계정을 성공적으로 삭제하였습니다.",
        status: 'success'
      }))
    },
    onError: (error: any) => {
      console.error('Error deleting user:', error.error);
    },
  });
};