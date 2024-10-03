import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../redux/commonUISlice";
import { Order } from "../../types";

interface EditOrderParams {
  id: string;
  status: string;
}

const editOrder = async ({ id, status }: EditOrderParams): Promise<Order> => {
  const response = await api.put(`/order/${id}`, { status });
  return response.data;
};

export const useEditOrder = (): UseMutationResult<Order, unknown, EditOrderParams> => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient(); 

  return useMutation<Order, unknown, EditOrderParams>({
    mutationFn: editOrder,
    onSuccess: () => {
      dispatch(
        setToastMessage({
          message: "주문내역이 수정되었습니다",
          status: "success",
        })
      );
      queryClient.invalidateQueries({ queryKey: ['orderList'] });
    },
    onError: (error: any) => {
      dispatch(
        setToastMessage({
          message: error.error,
          status: "error",
        })
      );
    },
  });
};
