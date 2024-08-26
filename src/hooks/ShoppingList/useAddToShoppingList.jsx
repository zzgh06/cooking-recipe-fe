import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { addToShoppingListToState } from "../../redux/shoppingListSlice";

const addToShoppingList = async (items) => {
  const response = await api.post("shoppingList/add", { items });
  return response.data.data;
};

export const useAddToShoppingList = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToShoppingList,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["shoppingList"]);
      dispatch(addToShoppingListToState(data));
    },
    onError: (error) => {
      console.error("Error adding to shopping list:", error);
    },
  });
};
