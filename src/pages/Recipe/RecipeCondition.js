import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipesByCategory } from "../../redux/recipeSlice";
import RecipeCard from "../../component/RecipeCard/RecipeCard";
import "../../style/RecipeAll.style.css";
import { Row, Col } from "react-bootstrap";
import RecipeCardSkeleton from "../../component/Skeleton/RecipeCardSkeleton";

const RecipeCondition = ({ category, path }) => {
  const dispatch = useDispatch();
  const { recipes, loading } = useSelector((state) => state.recipe);

  useEffect(() => {
    dispatch(fetchRecipesByCategory({ etc: category }));
  }, [dispatch]);

  const bestRecipes = [...recipes].sort((a, b) => b.viewCnt - a.viewCnt);
  const newRecipes = [...recipes].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="recipe-all-container">
      <Row className="recipe-card-container">
        {loading
          ? Array.from(new Array(8)).map((_, index) => (
              <Col key={index} xs={12} md={6} lg={3}>
                <RecipeCardSkeleton />
              </Col>
            ))
          : (path === "best"
              ? bestRecipes.slice(0, 16)
              : path === "new"
              ? newRecipes.slice(0, 16)
              : []
            ).map((recipe) => (
              <Col key={recipe._id} xs={12} md={6} lg={3}>
                <RecipeCard item={recipe} />
              </Col>
            ))}
      </Row>
    </div>
  );
};

export default RecipeCondition;
