import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../redux/commonUISlice";

const editOrder = async ({ id, status }) => {
  const response = await api.put(`/order/${id}`, { status });
  return response.data;
};

export const useEditOrder = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: editOrder,
    onSuccess: () => {
      dispatch(
        setToastMessage({
          message: "주문내역이 수정되었습니다",
          status: "success",
        })
      );
    },
    onError: (error) => {
      dispatch(
        setToastMessage({
          message: error.error,
          status: "error",
        })
      );
    },
  });
};
