import { useMutation, UseMutationResult } from '@tanstack/react-query';
import api from '../../utils/api';
import { useDispatch } from 'react-redux';
import { setLoginData, setUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { setToastMessage } from '../../redux/commonUISlice';
import { User } from '../../types';

interface LoginUserResponse {
  token: string;
  user: User;
}

const loginUser = async (userData: User): Promise<LoginUserResponse> => {
  const response = await api.post('/auth/login', userData);
  sessionStorage.setItem('token', response.data.token);
  return response.data;
};

export const useLoginUser = (): UseMutationResult<LoginUserResponse, any, User> => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation<LoginUserResponse, any, User>({
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