import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchRecipeFavorite = async () => {
  const response = await api.get("/favorite");
  return response.data.data;
};

export const useRecipeFavorite = () => {
  return useQuery({
    queryKey: ['recipeFavorite'],
    queryFn: fetchRecipeFavorite,
  });
};
