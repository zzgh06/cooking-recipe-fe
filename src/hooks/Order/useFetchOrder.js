import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";

const fetchOrderMe = async (query) => {
  const response = await api.get("/order/me", { params: { ...query } });
  return {
    orderList: response.data.data,
    totalPages: response.data.totalPageNum,
  };
};

export const useFetchOrder = (query) => {
  return useQuery({
    queryKey: ["order", query],
    queryFn: () => fetchOrderMe(query),
  });
};
