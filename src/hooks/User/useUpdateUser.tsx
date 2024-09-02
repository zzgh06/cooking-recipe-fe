import { useMutation, UseMutationResult } from '@tanstack/react-query';
import api from '../../utils/api';
import { useDispatch } from 'react-redux';
import { setUpdateUser, setError } from '../../redux/userSlice';
import { setToastMessage } from '../../redux/commonUISlice';

const updateUser = async (formData: any): Promise<any> => {
  const response = await api.put('/user/me', formData);
  return response.data.data;
};

export const useUpdateUser = (): UseMutationResult<any, any, any> => {
  const dispatch = useDispatch();

  return useMutation<any, any, any>({
    mutationFn: updateUser,
    onSuccess: (data) => {
      dispatch(setUpdateUser(data));
      dispatch(setToastMessage({
        message: "회원정보 수정 완료했습니다.",
        status: "success"
      }))
    },
    onError: (error: any) => {
      dispatch(setError(error.error || '회원정보 수정에 실패하였습니다'));
    },
  });
};