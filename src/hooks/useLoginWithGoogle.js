import { useMutation } from '@tanstack/react-query';
import api from '../utils/api';
import { useDispatch } from 'react-redux';
import { setLoginData, setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { setToastMessage } from '../redux/commonUISlice';

const loginWithGoogle = async (token) => {
  const response = await api.post('/auth/google', { token });
  sessionStorage.setItem('token', response.data.token);
  return response.data;
};

export const useLoginWithGoogle = () => {
  const dispatch = useDispatch();
  return useMutation({
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