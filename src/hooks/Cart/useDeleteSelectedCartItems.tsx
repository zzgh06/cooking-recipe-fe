import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setToastMessage } from "../../redux/commonUISlice";
import { clearSelectedItems } from "../../redux/cartSlice";
import { AxiosError } from "axios";
import { RootState } from "../../redux/store";

const deleteSelectedCartItemsApi = async (selectedItems: string[]): Promise<void> => {
  try {
    for (const id of selectedItems) {
      await api.delete(`/cart/${id}`);
    }
  } catch (error) {
    const axiosError = error as AxiosError; 
    throw new Error(axiosError.message);
  }
};

export const useDeleteSelectedCartItems = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.cart.selectedItems);

  return useMutation<void, Error>({
    mutationFn: () => deleteSelectedCartItemsApi(selectedItems),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey : ["cart"]});
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
