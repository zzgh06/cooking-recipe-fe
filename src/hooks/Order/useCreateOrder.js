import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../redux/commonUISlice";
import { useNavigate } from "react-router-dom";
import { addOrderToState } from "../../redux/orderSlice";

const createOrder = async (data) => {
  const response = await api.post("/order", data);
  return response.data.orderNum;
};

export const useCreateOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      dispatch(addOrderToState(data));
      dispatch(
        setToastMessage({
          message: "주문이 성공하였습니다",
          status: "success",
        })
      );
      navigate("/payment/success");
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
