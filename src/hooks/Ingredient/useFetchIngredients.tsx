import { useQuery, UseQueryResult } from '@tanstack/react-query';
import api from '../../utils/api';
import { Ingredient } from '../../types';

interface fetchIngredientsResponse {
  ingredients: Ingredient[];
  totalPages: number;
}

interface QueryParams {
  [key: string]: any;
}

const fetchIngredients = async (searchQuery: QueryParams): Promise<fetchIngredientsResponse> => {
  const response = await api.get('/ingredient', { params: searchQuery });
  return {
    ingredients: response.data.data.ingredients,
    totalPages: response.data.data.totalPageNum,
  };
};

export const useFetchIngredients = (searchQuery: QueryParams): UseQueryResult<fetchIngredientsResponse> => {
  return useQuery({
    queryKey: ['ingredients', searchQuery],
    queryFn: () => fetchIngredients(searchQuery),
  });
};
