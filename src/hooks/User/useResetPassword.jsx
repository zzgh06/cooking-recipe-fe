import { useMutation } from '@tanstack/react-query';
import api from '../../utils/api';
import { useDispatch } from 'react-redux';
import { setError } from '../../redux/userSlice';

const resetPassword = async ({ password, token }) => {
  await api.post(`/password/reset-password/${token}`, { password });
};

export const useResetPassword = () => {
  const dispatch = useDispatch();
  return useMutation({
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