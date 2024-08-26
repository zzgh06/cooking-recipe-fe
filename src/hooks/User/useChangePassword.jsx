import { useMutation } from '@tanstack/react-query';
import api from '../../utils/api';

const changePassword = async (newPassword) => {
  const response = await api.put('/password/change-password', { newPassword });
  return response.data;
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      alert(`${data.message}`);
    },
    onError: (error) => {
      return error.error || 'Request failed';
    },
  });
};
