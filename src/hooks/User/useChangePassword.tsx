import { useMutation, UseMutationResult } from '@tanstack/react-query';
import api from '../../utils/api';
import { useDispatch } from 'react-redux';
import { setToastMessage } from '../../redux/commonUISlice';

interface ChangePasswordResponse {
  status: string;
  message: string;
}

const changePassword = async (newPassword: string): Promise<ChangePasswordResponse> => {
  const response = await api.put('/password/change-password', { newPassword });
  return response.data;
};

export const useChangePassword = (): UseMutationResult<ChangePasswordResponse, any, string> => {
  const dispatch = useDispatch();
  return useMutation<ChangePasswordResponse, any, string>({
    mutationFn: changePassword,
    onSuccess: (data) => {
      dispatch(setToastMessage({ message: data.message, status: "success" }));
    },
    onError: (error) => {
      dispatch(setToastMessage({ message: error.error, status: "error" }));
    },
  });
};
