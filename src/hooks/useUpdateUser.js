import { useMutation } from '@tanstack/react-query';
import api from '../utils/api';
import { useDispatch } from 'react-redux';
import { setUpdateUser, setError } from '../redux/userSlice';

const updateUser = async (formData) => {
  const response = await api.put('/user/me', formData);
  return response.data;
};

export const useUpdateUser = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      dispatch(setUpdateUser(data.user));
    },
    onError: (error) => {
      dispatch(setError(error.error || '회원정보 수정에 실패하였습니다'));
    },
  });
};