import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";


const fetchIngredients = async (searchQuery) => {
  const response = await api.get(
    `/ingredient?name=${searchQuery.name}&page=${searchQuery.page}`
  );
  return response.data.data;
};

export const useFetchIngredients = (searchQuery) => {
  return useQuery({
    queryKey: ["ingredients", searchQuery],
    queryFn: () => fetchIngredients(searchQuery),
    staleTime: 60000,
    cacheTime: 300000,
    onError: (error) => {
      console.error("Error fetching ingredients:", error);
    },
  });
};