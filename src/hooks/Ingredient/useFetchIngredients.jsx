import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchIngredients = async (searchQuery) => {
  const response = await api.get('/ingredient', { params: searchQuery });
  return {
    ingredients: response.data.data.ingredients,
    totalPages: response.data.data.totalPageNum,
  };
};

export const useFetchIngredients = (searchQuery) => {
  return useQuery({
    queryKey: ['ingredients', searchQuery],
    queryFn: () => fetchIngredients(searchQuery),
    keepPreviousData: true,
  });
};
