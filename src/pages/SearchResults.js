import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchRecipes } from "../redux/recipeSlice";
import { fetchIngredients } from "../redux/ingredientSlice";
import RecipeCard from "../component/RecipeCard/RecipeCard"
import IngredientCard from "../component/IngredientCard/IngredientCard"
import { Col, Row } from "react-bootstrap";


const SearchResults = () => {
  const [query] = useSearchParams();
  const keyword = query.get("name");

  const dispatch = useDispatch();

  const { recipes, loading: recipesLoading, error: recipesError } = useSelector(
    (state) => state.recipe
  );
  const {
    ingredients,
    loading: ingredientsLoading,
    error: ingredientsError,
  } = useSelector((state) => state.ingredients);

  useEffect(() => {
    if (keyword) {
      dispatch(fetchRecipes({ name: keyword }));
      dispatch(fetchIngredients({ name: keyword }));
    }
  }, [dispatch, keyword]);

  return (
    <div className="search-results">
      <h2>Search Results for "{keyword}"</h2>

      <h3>Recipes</h3>
      {recipesLoading && <p>Loading recipes...</p>}
      {recipesError && <p>Error fetching recipes: {recipesError}</p>}
      <Row>
        {recipes.map((recipe) => (
          <Col key={recipe._id} xs={12} md={6} lg={3}>
            <RecipeCard item={recipe} />
          </Col>
        ))}
      </Row>
    

      <h3>Ingredients</h3>
      {ingredientsLoading && <p>Loading ingredients...</p>}
      {ingredientsError && <p>Error fetching ingredients: {ingredientsError}</p>}
      <Row>
        {ingredients.map((ing) => (
          <Col lg={3} key={ing._id}>
            <IngredientCard key={ing._id} item={ing} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default SearchResults;