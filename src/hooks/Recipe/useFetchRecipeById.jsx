import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchRecipeById = async (id) => {
  const response = await api.get(`/recipe/${id}`);
  return response.data.data;
};

export const useFetchRecipeById = (id) => {
  return useQuery({
    queryKey: ['recipe', id],
    queryFn: () => fetchRecipeById(id),
    staleTime: 60000,
    gcTime: 300000,
  });
};
