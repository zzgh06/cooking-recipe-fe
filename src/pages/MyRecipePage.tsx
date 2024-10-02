import React from "react";
import { useSelector } from "react-redux";
import RecipeForm from "../component/RecipeForm/RecipeForm";
import { Container } from "@mui/material";
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
    <Container sx={{ maxWidth: "1200px", marginTop: "50px" }}>
      <h1>레시피 등록</h1>
      <RecipeForm onSubmit={handleSubmit} />
    </Container>
  );
};

export default MyRecipePage;
