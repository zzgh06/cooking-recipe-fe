import { useQuery, UseQueryResult } from '@tanstack/react-query';
import api from '../../utils/api';
import { Ingredient } from '../../types';

const fetchIngredientById = async (id: string): Promise<Ingredient[]> => {
  const response = await api.get(`/ingredient/${id}`);
  return response.data.ingredient;
};

export const useGetIngredient = (id: string): UseQueryResult<Ingredient[], Error> => {
  return useQuery<Ingredient[], Error>({
    queryKey: ['ingredient', id],
    queryFn: () => fetchIngredientById(id),
    enabled: !!id,
  });
};