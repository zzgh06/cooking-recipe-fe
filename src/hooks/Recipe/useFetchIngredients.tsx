import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../../utils/api";
import { Ingredient } from "../../types";

interface IngredientSearchQuery {
  name: string;
  page: number;
}

interface IngredientResponse {
  data: Ingredient[];
}

const fetchIngredients = async (searchQuery: IngredientSearchQuery): Promise<IngredientResponse> => {
  const response = await api.get<IngredientResponse>(
    `/ingredient?name=${searchQuery.name}&page=${searchQuery.page}`
  );
  return response.data;
};

export const useFetchIngredients = (searchQuery: IngredientSearchQuery): UseQueryResult<IngredientResponse, unknown> => {
  return useQuery<IngredientResponse, unknown>({
    queryKey: ["ingredients", searchQuery],
    queryFn: () => fetchIngredients(searchQuery),
    staleTime: 60000,
    gcTime: 300000,
  });
};

