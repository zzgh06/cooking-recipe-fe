import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import RecipeForm from "../component/RecipeForm/RecipeForm";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import { useCreateRecipe } from "../hooks/Recipe/useCreateRecipe";
import { RootState } from "../redux/store";
import { Recipe } from "../types";

const MyRecipePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const { mutate: createRecipe } = useCreateRecipe();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

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
