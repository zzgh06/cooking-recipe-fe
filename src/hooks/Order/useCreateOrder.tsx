import { useMutation, UseMutationResult } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../redux/commonUISlice";
import { useNavigate } from "react-router-dom";
import { addOrderToState } from "../../redux/orderSlice";

interface createOrderParams {
  totalPrice: number;
  contactInfo: {
    shipTo: {
      address: string;
      city: string;
      zip: string;
    };
    contact: {
      firstName: string;
      lastName: string;
      contact: string;
    };
  };
  items: {
    ingredientId: string;
    price?: number;
    qty?: number;
  }[];
}

const createOrder = async (data: createOrderParams): Promise<string> => {
  const response = await api.post("/order", data);
  return response.data.orderNum;
};

export const useCreateOrder = (): UseMutationResult<
  string,
  unknown,
  createOrderParams
> => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation<string, unknown, createOrderParams>({
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
