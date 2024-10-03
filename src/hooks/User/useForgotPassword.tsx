import { useMutation } from '@tanstack/react-query';
import api from '../../utils/api';
import { useDispatch } from 'react-redux';
import { setError } from '../../redux/userSlice';

interface ForgotPasswordParams {
  email: string;
}

const forgotPassword = async ({ email }: ForgotPasswordParams) => {
  await api.post('/password/forgot-password', { email });
};

export const useForgotPassword = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      alert("비밀번호 재설정 이메일이 발송되었습니다 !");
    },
    onError: (error: any) => {
      dispatch(setError(error.error || 'Request failed'));
    },
  });
};