import { useMutation } from '@tanstack/react-query';
import api from '../utils/api';

const updateUser = async (formData) => {
  const response = await api.put('/user/me', formData);
  return response.data;
};

export const useUpdateUser = () => {
  return useMutation(updateUser);
};