import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";
import { CartItemType } from "../../types";

const fetchCart = async (): Promise<CartItemType[]> => {
  const response = await api.get(`/cart`);
  const cartItems = response.data.data;
  return cartItems;
};

export const useFetchCart = () => {
  return useQuery<CartItemType[], Error>({
    queryKey: ["cart"],
    queryFn: () => fetchCart(),
    staleTime: 60000,
    gcTime: 300000,
  });
};
