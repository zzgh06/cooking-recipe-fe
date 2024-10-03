import { useQuery, UseQueryResult } from '@tanstack/react-query';
import api from '../../utils/api';
import { User } from '../../types';

interface QueryParams {
  [key: string]: any;
}

interface GetUsersInfoResponse {
  usersData : User[];
  totalPageNum: number;
}

const getUsersInfo = async (query: QueryParams = {}): Promise<GetUsersInfoResponse> => {
  const response = await api.get(`/user/admin`, { params: { ...query }});
  return {
    usersData: response.data.data,
    totalPageNum: response.data.totalPageNum,
  };
};

export const useGetUsersInfo = (searchQuery: QueryParams = {}): UseQueryResult<GetUsersInfoResponse> => {
  return useQuery({
    queryKey: ['usersInfo', searchQuery],
    queryFn: () => getUsersInfo(searchQuery),
  });
};