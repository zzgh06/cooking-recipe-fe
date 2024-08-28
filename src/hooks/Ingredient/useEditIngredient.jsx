import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../redux/commonUISlice";
import { updateIngredientInState } from "../../redux/ingredientSlice";


const editIngredient = async ({ id, ingredient }) => {
  const response = await api.put(`/ingredient/${id}`, ingredient);
  return response.data;
};

export const useEditIngredient = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editIngredient,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['ingredients']);
      dispatch(updateIngredientInState(data))
      dispatch(
        setToastMessage({
          message: "재료가 수정됐습니다",
          status: "success",
        })
      );
    },
    onError: (error) => {
      dispatch(
        setToastMessage({
          message: error.error,
          status: "error",
        })
      );
    },
  });
};
