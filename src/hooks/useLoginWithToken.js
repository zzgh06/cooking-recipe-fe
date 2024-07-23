import { useMutation } from '@tanstack/react-query';
import api from '../utils/api';
import { useDispatch } from 'react-redux';
import { setUser, setIsAuthenticated } from '../redux/userSlice';

const fetchUser = async () => {
  const response = await api.get('/user/me');
  return response.data;
};

export const useLoginWithToken = () => {
  const dispatch = useDispatch();
  
  return useMutation({
    mutationFn: fetchUser,
    onSuccess: (data) => {
      dispatch(setUser(data));
    },
    onError: () => {
      sessionStorage.removeItem('token');
    },
  });
};
