import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const getUsersInfo = async (searchQuery) => {
  const { name, page } = searchQuery;
  const response = await api.get(`/user/admin?name=${name}&page=${page}`);
  return {
    usersData: response.data.data,
    totalPageNum: response.data.totalPageNum,
  };
};

export const useGetUsersInfo = (searchQuery) => {
  return useQuery({
    queryKey: ['usersInfo', searchQuery],
    queryFn: () => getUsersInfo(searchQuery),
    keepPreviousData: true,
  });
};