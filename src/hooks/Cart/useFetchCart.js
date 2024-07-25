import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";

const fetchCart = async () => {
  const response = await api.get(`/cart`);
  const cartItems = response.data.data;
  return cartItems;
};

export const useFetchCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchCart(),
  });
};
