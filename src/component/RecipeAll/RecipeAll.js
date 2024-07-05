import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../../redux/recipeSlice";
import RecipeCard from "../RecipeCard/RecipeCard";
import "../../style/RecipeAll.style.css";
import { Row, Col } from "react-bootstrap";
import Category from "../Category/Category";
import { Pagination, PaginationItem } from "@mui/material";

const RecipeAll = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipe.recipes);
  const [selectedCategory, setSelectedCategory] = useState("모두보기");

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const filteredRecipes =
    selectedCategory === "모두보기"
      ? recipes
      : recipes.filter((recipe) => recipe.categories.etc === selectedCategory);

  return (
    <div className="recipe-all-container">
      <div className="recipe-all-title">
        <h2>모든 레시피</h2>
        <p>What’s in your fridge의 모든 레시피를 만나보세요</p>
      </div>
      <div className="recipe-category">
        <Category
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>
      <Row className="recipe-card-container">
        {filteredRecipes.map((recipe) => (
          <Col key={recipe._id} xs={12} md={6} lg={3}>
            <RecipeCard item={recipe} />
          </Col>
        ))}
      </Row>
      <Pagination
        // page={page}
        count={10}
        size="large"
        sx={{marginBottom : '20px'}}
        renderItem={(item) => (
          <PaginationItem
            // component={Link}
            to={`/inbox${item.page === 1 ? "" : `?page=${item.page}`}`}
            {...item}
          />
        )}
      />
    </div>
  );
};

export default RecipeAll;
