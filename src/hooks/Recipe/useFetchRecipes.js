import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchRecipes = async (searchQuery) => {
  const response = await api.get('/recipe', { params: searchQuery });
  return {
    recipes: response.data.data,
    totalPages: response.data.totalPageNum,
  };
};

export const useFetchRecipes = (searchQuery) => {
  return useQuery({
    queryKey: ['recipes', searchQuery],
    queryFn: () => fetchRecipes(searchQuery),
    staleTime: 60000,
    cacheTime: 300000,
    keepPreviousData: true
  });
};