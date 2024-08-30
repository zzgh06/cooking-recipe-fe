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

const isCacheEnabled = process.env.REACT_APP_ENABLE_CACHE === 'true';

console.log(isCacheEnabled)

export const useFetchRecipes = (searchQuery) => {
  const queryResult = useQuery({
    queryKey: ['recipes', searchQuery],
    queryFn: () => fetchRecipes(searchQuery),
    staleTime: isCacheEnabled ? 5 * 60 * 1000 : 0,
    cacheTime: isCacheEnabled ? 10 * 60 * 1000 : 0, 
    keepPreviousData: true,
    refetchOnWindowFocus: isCacheEnabled,
    refetchOnReconnect: isCacheEnabled,
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
