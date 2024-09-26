import { useMutation } from '@tanstack/react-query';
import api from '../../utils/api';
import { useDispatch } from 'react-redux';
import { setToastMessage } from '../../redux/commonUISlice';

const changePassword = async (newPassword) => {
  const response = await api.put('/password/change-password', { newPassword });
  return response.data;
};

export const useChangePassword = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      dispatch(setToastMessage({ message: data.message, status: "success" }));
    },
    onError: (error) => {
      dispatch(setToastMessage({ message: error.error, status: "error" }));
    },
  });
};
