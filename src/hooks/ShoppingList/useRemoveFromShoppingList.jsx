import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { removeShoppingListItem } from "../../redux/shoppingListSlice";

const removeFromShoppingList = async (itemId) => {
  const response = await api.post("shoppingList/remove", { itemId });
  return response.data.data;
};

export const useRemoveFromShoppingList = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromShoppingList,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["shoppingList"]);
      dispatch(removeShoppingListItem(data))
    },
    onError: (error) => {
      console.error("Error removing from shopping list:", error);
    },
  });
};
