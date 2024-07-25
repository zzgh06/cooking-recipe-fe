import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchFridgeItems = async (query) => {
  const response = await api.get("/frige", { params: query });
  return response.data.data.userFrige;
};

export const useFetchFridgeItems = (query) => {
  return useQuery({
    queryKey: ['fridgeItems', query],
    queryFn: () => fetchFridgeItems(query),
  });
};
