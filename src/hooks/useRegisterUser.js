import { useMutation } from '@tanstack/react-query';
import api from '../utils/api';
import { useDispatch } from 'react-redux';
import { setError, setRegistrationData } from '../redux/userSlice';

const registerUser = async (userData) => {
  const response = await api.post('/user', userData);
  return response.data;
};

export const useRegisterUser = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      dispatch(setRegistrationData(data));
    },
    onError: (error) => {
      dispatch(setError(error.response?.data?.message || 'Registration failed'));
    },
  });
};
