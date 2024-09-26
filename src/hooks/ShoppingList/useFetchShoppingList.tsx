import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../../utils/api";
import { ShoppingListItem } from "../../types";

const fetchShoppingList = async (): Promise<ShoppingListItem[]> => {
  const response = await api.get("shoppingList/me");
  return response.data.data;
};

export const useFetchShoppingList = (): UseQueryResult<ShoppingListItem[]> => {
  return useQuery({
    queryKey: ["shoppingList"],
    queryFn: fetchShoppingList,
    staleTime: 60000,
    gcTime: 300000, 
    refetchOnWindowFocus: true, 
    refetchOnReconnect: true,
  });
};
