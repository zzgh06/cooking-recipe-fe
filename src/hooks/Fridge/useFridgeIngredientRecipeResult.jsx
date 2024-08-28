import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fridgeIngredientRecipeResult = async (query) => {
  const response = await api.get('/recipe/frige', { params: query });
  return response.data.recipeList;
};

export const useFridgeIngredientRecipeResult = (query) => {
  return useQuery({
    queryKey: ['fridgeIngredientRecipeResult', query],
    queryFn: () => fridgeIngredientRecipeResult(query),
  });
};
