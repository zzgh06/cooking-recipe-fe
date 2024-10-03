import { useMutation, UseMutationResult } from '@tanstack/react-query';
import api from '../../utils/api';
import { useDispatch } from 'react-redux';
import { setLoginData, setUser } from '../../redux/userSlice';
import { setToastMessage } from '../../redux/commonUISlice';
import { User } from '../../types';

interface KakaoLoginResponse {
  token: string;
  user: User;
}

interface KakaoLoginError {
  error: string;
}

const loginWithKakao = async (token: string): Promise<KakaoLoginResponse> => {
  const response = await api.post('/auth/kakao', { token });
  sessionStorage.setItem('token', response.data.token);
  return response.data;
};

export const useLoginWithKakao = (): UseMutationResult<KakaoLoginResponse, KakaoLoginError, string> => {
  const dispatch = useDispatch();
  return useMutation<KakaoLoginResponse, KakaoLoginError, string>({
    mutationFn: loginWithKakao,
    onSuccess: (data) => {
      dispatch(setUser(data.user));
      dispatch(setLoginData(data.user));
    },
    onError: (error) => {
      dispatch(
        setToastMessage({
          message: error.error,
          status: 'error',
        })
      );
    },
  });
};