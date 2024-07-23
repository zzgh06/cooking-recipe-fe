import { useMutation } from '@tanstack/react-query';
import api from '../utils/api';

const deleteUser = async (id) => {
  await api.delete(`/user/${id}`);
};

export const useDeleteUser = () => {
  return useMutation(deleteUser);
};