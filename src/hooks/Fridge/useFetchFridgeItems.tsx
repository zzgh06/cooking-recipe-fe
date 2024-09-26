import { useQuery, UseQueryResult } from '@tanstack/react-query';
import api from '../../utils/api';
import { FridgeItem } from '../../types';

interface FetchFridgeItemsResponse {
  data: {
    userFrige: FridgeItem[];
  };
}

interface QueryParams {
  [key: string]: any;
}

const fetchFridgeItems = async (query: QueryParams): Promise<FridgeItem[]> => {
  const response = await api.get<FetchFridgeItemsResponse>("/frige", { params: query });
  return response.data.data.userFrige;
};

export const useFetchFridgeItems = (query: QueryParams = {}): UseQueryResult<FridgeItem[]> => {
  return useQuery<FridgeItem[]>({
    queryKey: ['fridgeItems', query],
    queryFn: () => fetchFridgeItems(query),
  });
};