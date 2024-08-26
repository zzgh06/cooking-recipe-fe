import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../redux/commonUISlice";
import { addRecipeToState } from "../../redux/recipeSlice";
import { useNavigate } from "react-router-dom";

const createRecipe = async (recipeData) => {
  const response = await api.post("/recipe", recipeData);
  return response.data.recipe;
};

export const useCreateRecipe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createRecipe,
    onSuccess: (data) => {
      dispatch(addRecipeToState(data));
      dispatch(
        setToastMessage({
          message: "레시피가 생성되었습니다",
          status: "success",
        })
      );
      navigate("/")
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
