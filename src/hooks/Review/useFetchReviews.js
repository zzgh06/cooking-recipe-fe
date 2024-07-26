import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { setReviews } from "../../redux/reviewSlice";


const fetchReviews = async ({ type, id, page, limit }) => {
  const response = await api.get(`/review/${type}/${id}?page=${page}&limit=${limit}`);
  return response.data;
};

export const useFetchReviews = ({ type, id, page, limit }) => {
  return useQuery({
    queryKey: ["reviews", type, id, page, limit],
    queryFn: () => fetchReviews({ type, id, page, limit }),
  });
};
