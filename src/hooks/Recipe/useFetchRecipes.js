import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';
import { useEffect } from 'react';

let fetchCallCount = 0;

const fetchRecipes = async (searchQuery) => {
  fetchCallCount += 1;
  console.log(`API 호출 횟수: ${fetchCallCount}, 검색 쿼리:`, searchQuery);

  const response = await api.get('/recipe', { params: searchQuery });
  return {
    recipes: response.data.data,
    totalPages: response.data.totalPageNum,
  };
};

export const useFetchRecipes = (searchQuery) => {
  const queryResult = useQuery({
    queryKey: ['recipes', searchQuery],
    queryFn: () => fetchRecipes(searchQuery),
    staleTime: 0,
    gcTime: 0,
    keepPreviousData: true,
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
