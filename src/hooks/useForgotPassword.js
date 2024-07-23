import { useMutation } from '@tanstack/react-query';
import api from '../utils/api';

const forgotPassword = async ({ email }) => {
  await api.post('/password/forgot-password', { email });
};

export const useForgotPassword = () => {
  return useMutation(forgotPassword);
};