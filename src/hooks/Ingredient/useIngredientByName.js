import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";

const fetchIngredientByName = async (name) => {
  const response = await api.get(`/ingredient?name=${name}`);
  return response.data.data.ingredients[0];
};

export const useIngredientByName = (name) => {
  return useQuery({
    queryKey: ["ingredient", name],
    queryFn: () => fetchIngredientByName(name),
    enabled: !!name,
  });
};
