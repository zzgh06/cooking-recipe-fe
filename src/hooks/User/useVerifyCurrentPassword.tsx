import { useMutation, UseMutationResult } from '@tanstack/react-query';
import api from '../../utils/api';
import { useDispatch } from 'react-redux';
import { setError, setIsAuthenticated } from '../../redux/userSlice';

interface VerifyPasswordResponse {
  status: string;
  message: string;
  isAuthenticated: boolean;
}

const verifyCurrentPassword = async (currentPassword: string): Promise<VerifyPasswordResponse> => {
  const response = await api.post('/password/verify-password', { currentPassword });
  return response.data;
};

export const useVerifyCurrentPassword = (): UseMutationResult<
  VerifyPasswordResponse,
  any,
  string
  > => {
  const dispatch = useDispatch();
  return useMutation<VerifyPasswordResponse, any, string>({
    mutationFn: verifyCurrentPassword,
    onSuccess: (data) => {
      dispatch(setIsAuthenticated(data.isAuthenticated))
    },
    onError: (error) => {
      dispatch(setError(error.error || 'Request failed'));
    },
  });
};
