import { useMutation } from '@tanstack/react-query';
import api from '../utils/api';
import { useDispatch } from 'react-redux';
import { setLoginData, setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { setToastMessage } from '../redux/commonUISlice';

const loginUser = async (userData) => {
  const response = await api.post('/auth/login', userData);
  sessionStorage.setItem('token', response.data.token);
  return response.data;
};

export const useLoginUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      dispatch(setUser(data.user));
      dispatch(setLoginData(data.user));
      navigate("/")
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