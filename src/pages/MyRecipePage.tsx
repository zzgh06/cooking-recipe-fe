import React from "react";
import { useSelector } from "react-redux";
import RecipeForm from "../component/RecipeForm/RecipeForm";
import { useCreateRecipe } from "../hooks/Recipe/useCreateRecipe";
import { RootState } from "../redux/store";
import { Recipe } from "../types";

const MyRecipePage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { mutate: createRecipe } = useCreateRecipe();

  const handleSubmit = async (data: Recipe) => {
    if (!user) return;
    const recipeData: Recipe = {
      ...data,
      userId: user._id,
    };
    await createRecipe(recipeData);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto mt-[75px]">
      <h1 className="text-3xl text-center font-bold mb-4">레시피 등록</h1>
      <RecipeForm onSubmit={handleSubmit} />
    </div>
  );
};

export default MyRecipePage;
