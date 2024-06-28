import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { createRecipe } from "../redux/recipeSlice";
import RecipeForm from "../component/RecipeForm/RecipeForm";

import { useNavigate } from "react-router-dom";

const MyRecipePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      navigate("/login"); // 로그인되지 않은 경우 로그인 페이지로 리디렉션
    }
  }, [user, navigate]);

  const handleSubmit = async (data) => {
    const recipeData = {
      ...data,
      userId: user.user._id,
    };
    console.log("recipeData to be submitted:", recipeData);
    const resultAction = await dispatch(createRecipe(recipeData));
  };

  if (!user) {
    return null; // 리디렉션 중에는 아무것도 렌더링하지 않음
  }

  return (
    <Container style={{ maxWidth: "1200px" }}>
      <h1>레시피 등록</h1>
      <RecipeForm onSubmit={handleSubmit} />
    </Container>
  );
};

export default MyRecipePage;
