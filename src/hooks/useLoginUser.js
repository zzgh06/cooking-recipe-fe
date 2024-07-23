import { useMutation } from '@tanstack/react-query';
import api from '../utils/api';
import { useDispatch } from 'react-redux';
import { setLoginData, setUser } from '../redux/userSlice';

const loginUser = async (userData) => {
  const response = await api.post('/auth/login', userData);
  sessionStorage.setItem('token', response.data.token);
  return response.data;
};

export const useLoginUser = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      dispatch(setUser(data.user));
      dispatch(setLoginData(data));
    },
    onError: (error) => {
      console.error('로그인 실패', error);
    },
  });
};