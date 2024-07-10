import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipesByCategory } from "../../redux/recipeSlice";
import RecipeCard from "../../component/RecipeCard/RecipeCard";
import "../../style/RecipeAll.style.css";
import { Row, Col } from "react-bootstrap";
import { Pagination } from "@mui/material";
import RecipeCardSkeleton from "../../component/Skeleton/RecipeCardSkeleton";

const RecipeAll = ({ category, path }) => {
  const dispatch = useDispatch();
  const { recipes, loading, totalPages } = useSelector((state) => state.recipe);
  const [page, setPage] = useState(1);
  const [prevCategory, setPrevCategory] = useState(category);


  useEffect(() => {
    // 카테고리가 변경되었을 때 페이지를 1로 초기화
    if (prevCategory !== category) {
      setPage(1);
      setPrevCategory(category);
    }
    dispatch(fetchRecipesByCategory({ etc: category, page }));
  }, [dispatch, category, page, prevCategory]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };


  return (
    <div className="recipe-all-container">
      <Row className="recipe-card-container">
        {loading
          ? Array.from(new Array(8)).map((_, index) => (
              <Col key={index} xs={12} md={6} lg={3}>
                <RecipeCardSkeleton />
              </Col>
            ))
          : recipes.map((recipe) => (
              <Col key={recipe._id} xs={12} md={6} lg={3}>
                <RecipeCard item={recipe} />
              </Col>
            ))}
      </Row>
      <Pagination
        count={totalPages}
        size="large"
        sx={{ marginBottom: "20px" }}
        page={page}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default RecipeAll;
