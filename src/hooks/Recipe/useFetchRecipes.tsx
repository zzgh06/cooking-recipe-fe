import { useQuery, UseQueryResult } from '@tanstack/react-query';
import api from '../../utils/api';
import { useEffect } from 'react';
import { Recipe, SearchQuery } from '../../types';

interface FetchRecipesResponse  {
  recipes: Recipe[];
  totalPages: number;
}
let fetchCallCount = 0;

const fetchRecipes = async (searchQuery : SearchQuery): Promise<FetchRecipesResponse> => {
  fetchCallCount += 1;
  console.log(`API 호출 횟수: ${fetchCallCount}, 검색 쿼리:`, searchQuery);

  const response = await api.get<{ data: Recipe[], totalPageNum: number }>('/recipe', { params: searchQuery });
  return {
    recipes: response.data.data,
    totalPages: response.data.totalPageNum,
  };
};

export const useFetchRecipes = (searchQuery: SearchQuery): UseQueryResult<FetchRecipesResponse, Error> => {
  const queryResult = useQuery<FetchRecipesResponse, Error>({
    queryKey: ['recipes', searchQuery],
    queryFn: () => fetchRecipes(searchQuery),
    staleTime: 0,
    gcTime: 0,
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { status, data, error } = queryResult;

  useEffect(() => {
    if (status === "success") {
      console.log('쿼리 성공: 캐시된 데이터 사용 여부 확인', data);
    } else if (status === "error") {
      console.log('쿼리 오류 발생:', error);
    }
  }, [status, data, error])

  return queryResult;
};
