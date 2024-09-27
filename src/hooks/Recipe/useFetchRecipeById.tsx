import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';
import { Recipe } from '../../types';

const fetchRecipeById = async (id: string): Promise<Recipe> => {
  const response = await api.get(`/recipe/${id}`);
  return response.data.data;
};

export const useFetchRecipeById = (id: string) => {
  return useQuery<Recipe, Error>({
    queryKey: ['recipe', id],
    queryFn: () => fetchRecipeById(id),
    staleTime: 60000,
    gcTime: 300000,
  });
};
