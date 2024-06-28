import React from 'react';
import { useSelector } from 'react-redux';
import RecipeCard from '../RecipeCard/RecipeCard'

const MyRecipeComponent = () => {  
  const user = useSelector(state => state.auth.user);
  const recipes = useSelector(state => state.recipe.recipes);
  
  const userRecipes = recipes.filter(recipe => recipe.userId === user.user._id);

  return (
    <div className="my-recipe-list">
        <h2><stron>{user.user.name}</stron> 님의 레시피</h2>
       {userRecipes.length > 0 ? (
        <div className="recipe-list">
          {userRecipes.map(recipe => (
            <RecipeCard key={recipe._id} item={recipe} className="small-recipe-card"/>
          ))}
        </div>
      ) : (
        <p>작성한 레시피가 없습니다.</p>
      )}
    </div>
  );
};

export default MyRecipeComponent;
