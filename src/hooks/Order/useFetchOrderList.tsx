import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";
import { Order } from "../../types";

interface FetchOrderListQuery {
  [key: string]: any;
}

interface FetchOrderListResponse {
  data: Order[]; 
  totalPageNum: number;
}

const fetchOrderList = async (query: FetchOrderListQuery): Promise<FetchOrderListResponse> => {
  const response = await api.get("/order", { params: { ...query } });
  return response.data;
};

export const useFetchOrderList = (query: FetchOrderListQuery) => {
  return useQuery<FetchOrderListResponse, Error>({
    queryKey: ["orderList", query],
    queryFn: () => fetchOrderList(query),
    staleTime: 60000,
    gcTime: 300000,
  });
};
