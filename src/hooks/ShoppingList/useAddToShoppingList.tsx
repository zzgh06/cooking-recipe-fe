import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { addToShoppingListToState } from "../../redux/shoppingListSlice";

interface AddToShoppingListItems {
  name: string;
  qty: number;
  unit: string;
}

const addToShoppingList = async (items: AddToShoppingListItems[]) => {
  const response = await api.post("shoppingList/add", { items });
  return response.data.data;
};

export const useAddToShoppingList = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToShoppingList,
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ["shoppingList"]});
      dispatch(addToShoppingListToState(data));
    },
    onError: (error: any) => {
      console.error("Error adding to shopping list:", error);
    },
  });
};
