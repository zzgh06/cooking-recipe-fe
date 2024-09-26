import { useQuery, UseQueryResult } from '@tanstack/react-query';
import api from '../../utils/api';
import { RecipeItem } from '../../types';

const fetchRecommendedRecipes = async (checkedItems: string[]): Promise<RecipeItem[]> => {
  const response = await api.get("/recipe/frige/recommend", {
    params: { checkedItems: checkedItems.join(',') },
  });
  return response.data.recipeList;
};

export const useFetchRecommendedRecipes = (checkedItems: string[]): UseQueryResult<RecipeItem[], Error> => {
  return useQuery({
    queryKey: ['recommendedRecipes', checkedItems],
    queryFn: () => fetchRecommendedRecipes(checkedItems),
    staleTime:30000,
    gcTime:60000,
    retryDelay: 60000
  });
};
