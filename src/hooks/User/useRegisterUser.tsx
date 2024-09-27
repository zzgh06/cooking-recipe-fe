import { useMutation, UseMutationResult } from '@tanstack/react-query';
import api from '../../utils/api';
import { useDispatch } from 'react-redux';
import { setError, setRegistrationData } from '../../redux/userSlice';
import { User } from '../../types';

const registerUser = async (userData: User): Promise<User> => {
  const response = await api.post('/user', userData);
  return response.data;
};

export const useRegisterUser = (): UseMutationResult<User, any, User> => {
  const dispatch = useDispatch();

  return useMutation<User, any, User>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      dispatch(setRegistrationData(data));
    },
    onError: (error) => {
      dispatch(setError(error.response?.data?.message || 'Registration failed'));
    },
  });
};
