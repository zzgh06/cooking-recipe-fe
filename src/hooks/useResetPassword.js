import { useMutation } from '@tanstack/react-query';
import api from '../utils/api';

const resetPassword = async ({ password, token }) => {
  await api.post(`/password/reset-password/${token}`, { password });
};

export const useResetPassword = () => {
  return useMutation(resetPassword);
};