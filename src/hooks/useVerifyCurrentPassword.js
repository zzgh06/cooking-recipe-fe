import { useMutation } from '@tanstack/react-query';
import api from '../utils/api';
import { useDispatch } from 'react-redux';
import { setError, setIsAuthenticated } from '../redux/userSlice';

const verifyCurrentPassword = async (currentPassword) => {
  const response = await api.post('/password/verify-password', { currentPassword });
  return response.data;
};

export const useVerifyCurrentPassword = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: verifyCurrentPassword,
    onSuccess: (data) => {
      dispatch(setIsAuthenticated(data))
    },
    onError: (error) => {
      dispatch(setError(error.error || 'Request failed'));
    },
  });
};
