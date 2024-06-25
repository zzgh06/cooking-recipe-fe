import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { createRecipe } from '../redux/recepiSlice';
import RecipeForm from '../component/RecipeForm/RecipeForm';

const MyRecipePage = () => {
  const [submittedData, setSubmittedData] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const handleSubmit = async (data) => {
    const recipeData = {
      ...data,
      userId: user.user._id,
    };
    console.log("recipeData to be submitted:", recipeData);
    const resultAction = await dispatch(createRecipe(recipeData));
    if (createRecipe.fulfilled.match(resultAction)) {
      setSubmittedData(resultAction.payload);
    }
  };

  return (
    <Container style={{ maxWidth: '1200px' }}>
      <h1>레시피 등록</h1>
      <RecipeForm onSubmit={handleSubmit} />
      {submittedData && (
        <div className="mt-5">
          <h2>Submitted Recipe Data</h2>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </Container>
  );
};

export default MyRecipePage;
