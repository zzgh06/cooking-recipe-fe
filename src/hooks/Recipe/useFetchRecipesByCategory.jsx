import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";

const fetchRecipesByCategory = async ({ food, mood, method, ingredient, etc, page }) => {
  const queryParams = new URLSearchParams({
    ...(food && { food }),
    ...(mood && { mood }),
    ...(method && { method }),
    ...(ingredient && { ingredient }),
    ...(etc && { etc }),
    ...(page && { page }),
  }).toString();
  const response = await api.get(`/recipe/category?${queryParams}`);
  return response.data;
};

export const useFetchRecipesByCategory = (queryParams) => {
  return useQuery({
    queryKey: ["recipesByCategory", queryParams],
    queryFn: () => fetchRecipesByCategory(queryParams),
  });
};
