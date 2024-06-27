import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { createRecipe } from '../redux/recipeSlice';
import RecipeForm from '../component/RecipeForm/RecipeForm';

const MyRecipePage = () => {
 
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const handleSubmit = async (data) => {
    const recipeData = {
      ...data,
      userId: user.user._id,
    };
    console.log("recipeData to be submitted:", recipeData);
    const resultAction = await dispatch(createRecipe(recipeData));
    
  };

  return (
    <Container style={{ maxWidth: '1200px' }}>
      <h1>레시피 등록</h1>
      <RecipeForm onSubmit={handleSubmit} />    
    </Container>
  );
};

export default MyRecipePage;
