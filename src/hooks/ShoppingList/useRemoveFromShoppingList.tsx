import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { removeShoppingListItem } from "../../redux/shoppingListSlice";
import { ShoppingListItem } from "../../types";

const removeFromShoppingList = async (itemId: string): Promise<ShoppingListItem[]> => {
  const response = await api.post("shoppingList/remove", { itemId });
  return response.data.data;
};

export const useRemoveFromShoppingList = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromShoppingList,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["shoppingList"] });
      dispatch(removeShoppingListItem(data))
    },
    onError: (error) => {
      console.error("Error removing from shopping list:", error);
    },
  });
};
