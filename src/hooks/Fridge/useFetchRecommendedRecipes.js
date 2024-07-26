import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchRecommendedRecipes = async (checkedItems) => {
  const response = await api.get("/recipe/frige/recommend", {
    params: { checkedItems: checkedItems.join(',') },
  });
  return response.data.recipeList;
};

export const useFetchRecommendedRecipes = (checkedItems) => {
  return useQuery({
    queryKey: ['recommendedRecipes', checkedItems],
    queryFn: () => fetchRecommendedRecipes(checkedItems),
    retry: 0,
    retryDelay: 60000
  });
};
