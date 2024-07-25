import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";

const fetchOrderList = async (query) => {
  const response = await api.get("/order", { params: { ...query } });
  return response.data;
};

export const useFetchOrderList = (query) => {
  return useQuery({
    queryKey: ["orderList", query],
    queryFn: () => fetchOrderList(query),
  });
};
