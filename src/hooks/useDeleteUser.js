import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/api';

const deleteUser = async (id) => {
  await api.delete(`/user/${id}`);
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['usersInfo']);
    },
    onError: (error) => {
      console.error('Error deleting user:', error);
    },
  });
};