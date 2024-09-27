import { useMutation, UseMutationResult } from '@tanstack/react-query';
import api from '../../utils/api';
import { useDispatch } from 'react-redux';
import { setLoginData, setUser } from '../../redux/userSlice';
import { setToastMessage } from '../../redux/commonUISlice';
import { User } from '../../types';

interface LoginResponse {
  token: string;
  user: User;
}

const loginWithGoogle = async (token: string): Promise<LoginResponse> => {
  const response = await api.post('/auth/google', { token });
  sessionStorage.setItem('token', response.data.token);
  return response.data;
};

export const useLoginWithGoogle = (): UseMutationResult<LoginResponse, any, string> => {
  const dispatch = useDispatch();
  return useMutation<LoginResponse, any, string>({
    mutationFn: loginWithGoogle,
    onSuccess: (data) => {
      dispatch(setUser(data.user));
      dispatch(setLoginData(data.user));
    },
    onError: (error) => {
      dispatch(
        setToastMessage({
          message: error.error || "로그인 실패",
          status: 'error',
        })
      );
    },
  });
};