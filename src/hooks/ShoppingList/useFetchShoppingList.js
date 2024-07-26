import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";

const fetchShoppingList = async () => {
  const response = await api.get("shoppingList/me");
  return response.data.data;
};

export const useFetchShoppingList = () => {
  return useQuery({
    queryKey: ["shoppingList"],
    queryFn: fetchShoppingList,
    staleTime: 60000,
    cacheTime: 300000, 
    refetchOnWindowFocus: true, 
    refetchOnReconnect: true,
  });
};
