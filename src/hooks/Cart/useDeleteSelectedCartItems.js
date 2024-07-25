import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setToastMessage } from "../../redux/commonUISlice";
import { clearSelectedItems } from "../../redux/cartSlice";

const deleteSelectedCartItemsApi = async (selectedItems) => {
  try {
    for (const id of selectedItems) {
      await api.delete(`/cart/${id}`);
    }
  } catch (error) {
    throw new Error(error.error);
  }
};

export const useDeleteSelectedCartItems = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const selectedItems = useSelector((state) => state.cart.selectedItems);

  return useMutation({
    mutationFn: () => deleteSelectedCartItemsApi(selectedItems),
    onSuccess: async () => {
      await queryClient.invalidateQueries("cart");
      dispatch(clearSelectedItems());
    },
    onError: (error) => {
      dispatch(
        setToastMessage({
          message: error.message,
          status: "error",
        })
      );
    },
  });
};
