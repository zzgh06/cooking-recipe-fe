import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../redux/recipeSlice";
import { useParams } from "react-router-dom";
import RecipeCard from "../component/RecipeCard/RecipeCard";
import "../style/CategoryRecipePage.style.css";

const CategoryRecipePage = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { recipes, loading, error } = useSelector((state) => state.recipe);

  useEffect(() => {
    const searchQuery = {
      name: "",
      page: 1,
    };

    dispatch(fetchRecipes(searchQuery));
  }, [dispatch]);

  const filteredRecipes = recipes.filter(
    (recipe) => recipe.categories.etc === category
  );

  return (
    <div className="category-recipe-page">
      <h2>{category} 레시피</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="recipe-card-container">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe._id} item={recipe} />
        ))}
      </div>
    </div>
  );
};

export default CategoryRecipePage;
