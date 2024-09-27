import { useMutation, UseMutationResult } from '@tanstack/react-query';
import api from '../../utils/api';
import { useDispatch } from 'react-redux';
import { setError } from '../../redux/userSlice';

interface ResetPasswordParams {
  password: string;
  token: string;
}

const resetPassword = async ({ password, token }: ResetPasswordParams): Promise<void> => {
  await api.post(`/password/reset-password/${token}`, { password });
};

export const useResetPassword = (): UseMutationResult<void, any, ResetPasswordParams> => {
  const dispatch = useDispatch();
  return useMutation<void, any, ResetPasswordParams>({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      alert("새 비밀번호가 설정되었습니다!\n로그인 후 이용해 주세요.");
    },
    onError: (error) => {
      alert("만료된 토큰입니다.\n비밀번호 재설정 링크를 다시 받아주세요.");
      dispatch(setError(error.error || 'Request failed'));
    },
  });
};