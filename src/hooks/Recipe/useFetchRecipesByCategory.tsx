import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../../utils/api";
import { Recipe } from "../../types";

interface FetchRecipesByCategoryParams {
  food?: string;
  mood?: string;
  method?: string;
  ingredient?: string;
  etc?: string;
  page?: string;
}

interface FetchRecipesByCategoryResponse {
  recipeList: Recipe[];
  totalPages: number;  
}

const fetchRecipesByCategory = async (params: FetchRecipesByCategoryParams): Promise<FetchRecipesByCategoryResponse> => {
  const queryParams = new URLSearchParams({
    ...(params.food && { food: params.food }),
    ...(params.mood && { mood: params.mood }),
    ...(params.method && { method: params.method }),
    ...(params.ingredient && { ingredient: params.ingredient }),
    ...(params.etc && { etc: params.etc }),
    ...(params.page && { page: params.page }),
  }).toString();

  const response = await api.get<FetchRecipesByCategoryResponse>(`/recipe/category?${queryParams}`);
  return response.data;
};

export const useFetchRecipesByCategory = (
  queryParams: FetchRecipesByCategoryParams
): UseQueryResult<FetchRecipesByCategoryResponse, Error> => {
  return useQuery({
    queryKey: ["recipesByCategory", queryParams],
    queryFn: () => fetchRecipesByCategory(queryParams),
  });
};