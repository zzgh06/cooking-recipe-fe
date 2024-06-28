import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../../redux/recipeSlice";
import RecipeCard from "../RecipeCard/RecipeCard";
import "../../style/RecipeAll.style.css";
import { Row, Col } from "react-bootstrap";
import Category from "../Category/Category";

const RecipeAll = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipe.recipes);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);
  return (
    <div className="recipe-all-container">
      <div className="recipe-all-title">
        <h2>모든 레시피</h2>
        <p>What’s in your fridge의 모든 레시피를 만나보세요</p>
      </div>
      
      <Row className="recipe-card-container">
        {recipes.map((recipe) => (
          <Col key={recipe._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <RecipeCard item={recipe} />
          </Col>
        ))}
      </Row>

      <div className="recipe-category">
        <Category />
      </div>
    </div>
  );
};

export default RecipeAll;