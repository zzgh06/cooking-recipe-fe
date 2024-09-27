import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../../utils/api";
import { OrderItem } from "../../types";

interface QueryParams {
  [key: string]: any;
}

interface OrderMeResponse {
  orderList: OrderItem[];
  totalPages: number;
}

const fetchOrderMe = async (query: QueryParams): Promise<OrderMeResponse> => {
  const response = await api.get("/order/me", { params: { ...query } });
  return {
    orderList: response.data.data,
    totalPages: response.data.totalPageNum,
  };
};

export const useFetchOrder = (query: QueryParams): UseQueryResult<OrderMeResponse> => {
  return useQuery<OrderMeResponse>({
    queryKey: ["order", query],
    queryFn: () => fetchOrderMe(query),
    staleTime: 60000,
    gcTime: 300000,
  });
};
