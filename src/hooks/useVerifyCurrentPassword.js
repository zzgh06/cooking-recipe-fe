import { useMutation } from '@tanstack/react-query';
import api from '../utils/api';

const verifyCurrentPassword = async (currentPassword) => {
  const response = await api.post('/password/verify-password', { currentPassword });
  return response.data;
};

export const useVerifyCurrentPassword = () => {
  return useMutation(verifyCurrentPassword);
};