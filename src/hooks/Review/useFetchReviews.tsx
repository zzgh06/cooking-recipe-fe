import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";
import { Review } from "../../types";

interface FetchReviewsParams {
  type: string;
  id: string | number;
  page: number;
  limit: number;
}

interface ReviewsResponse {
  reviews : Review[];
  totalReviews : number;
  allReviews: Review[];
}

const fetchReviews = async ({ type, id, page, limit }: FetchReviewsParams): Promise<ReviewsResponse> => {
  const response = await api.get(`/review/${type}/${id}?page=${page}&limit=${limit}`);
  return response.data;
};

export const useFetchReviews = ({ type, id, page, limit }: FetchReviewsParams) => {
  return useQuery({
    queryKey: ["reviews", type, id, page, limit],
    queryFn: () => fetchReviews({ type, id, page, limit }),
  });
};
