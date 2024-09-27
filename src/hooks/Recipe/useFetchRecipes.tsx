import { useQuery, UseQueryResult } from '@tanstack/react-query';
import api from '../../utils/api';
import { Recipe, SearchQuery } from '../../types';

interface FetchRecipesResponse {
  recipes: Recipe[];
  totalPages: number;
}

const fetchRecipes = async (searchQuery: SearchQuery): Promise<FetchRecipesResponse> => {
  const response = await api.get<{ data: Recipe[], totalPageNum: number }>('/recipe', {
    params: searchQuery,
  });

  return {
    recipes: response.data.data,
    totalPages: response.data.totalPageNum,
  };
};

export const useFetchRecipes = (
  searchQuery: SearchQuery
): UseQueryResult<FetchRecipesResponse, unknown> => {
  return useQuery<FetchRecipesResponse, unknown>({
    queryKey: ['recipes', searchQuery],
    queryFn: () => fetchRecipes(searchQuery),
    staleTime: 60000,
    gcTime: 300000,
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
