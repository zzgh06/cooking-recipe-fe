import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchIngredientById = async (id) => {
  const response = await api.get(`/ingredient/${id}`);
  return response.data.ingredient;
};

export const useGetIngredient = (id) => {
  return useQuery({
    queryKey: ['ingredient', id],
    queryFn: () => fetchIngredientById(id),
    enabled: !!id,
  });
};