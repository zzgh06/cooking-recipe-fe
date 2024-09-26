import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import { moveToCompletedListState } from "../../redux/shoppingListSlice";
import { useDispatch } from "react-redux";
import { ShoppingListItem } from "../../types";

const moveToCompletedList = async (item: ShoppingListItem): Promise<ShoppingListItem[]> => {
  const response = await api.post("shoppingList/moveToShoppingList", { item });
  return response.data.data;
};

export const useMoveToCompletedList = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: moveToCompletedList,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["shoppingList"] });
      dispatch(moveToCompletedListState(data))
    },
    onError: (error) => {
      console.error("Error moving to completed list:", error);
    },
  });
};
