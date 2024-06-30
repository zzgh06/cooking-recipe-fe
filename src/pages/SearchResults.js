import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchRecipes } from "../redux/recipeSlice";
import { fetchIngredients } from "../redux/ingredientSlice";
import RecipeCard from "../component/RecipeCard/RecipeCard";
import IngredientCard from "../component/IngredientCard/IngredientCard";
import { Col, Row, Spinner } from "react-bootstrap";

const SearchResults = () => {
  const [query] = useSearchParams();
  const keyword = query.get("name");

  const dispatch = useDispatch();

  const {
    recipes,
    loading: recipesLoading,
    error: recipesError,
  } = useSelector((state) => state.recipe);
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

  const isLoading = recipesLoading || ingredientsLoading;
  const isError = recipesError || ingredientsError;

  return (
    <div className="search-results">
      <h2>Search Results for "{keyword}"</h2>

      {isLoading ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      ) : isError ? (
        <div className="text-center my-5">
          <p>Error fetching data. Please try again later.</p>
          {recipesError && <p>Recipe error: {recipesError}</p>}
          {ingredientsError && <p>Ingredient error: {ingredientsError}</p>}
        </div>
      ) : (
        <>
          <h3>Recipes</h3>
          <Row>
            {recipes.map((recipe) => (
              <Col key={recipe._id} xs={12} md={6} lg={3}>
                <RecipeCard item={recipe} />
              </Col>
            ))}
          </Row>

          <h3>Ingredients</h3>
          <Row>
            {ingredients.map((ing) => (
              <Col lg={3} key={ing._id}>
                <IngredientCard item={ing} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default SearchResults;
