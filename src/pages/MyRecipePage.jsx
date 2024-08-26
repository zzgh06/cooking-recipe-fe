import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipeForm from "../component/RecipeForm/RecipeForm";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import { useCreateRecipe } from "../hooks/Recipe/useCreateRecipe";

const MyRecipePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { mutate: createRecipe, isLoading } = useCreateRecipe();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSubmit = async (data) => {
    if (!user) return;
    const recipeData = {
      ...data,
      userId: user._id,
    };
    createRecipe(recipeData);
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
