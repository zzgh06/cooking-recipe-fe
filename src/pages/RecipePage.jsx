import React from "react";
import { Box } from "@mui/material";
import RecipeAll from "../component/RecipeAll/RecipeAll";
import { useLocation, useParams } from "react-router-dom";
import RecipeTitle from "../component/RecipeTitle/RecipeTitle";
import RecipeCategory from "../component/RecipeCategory/RecipeCategory";
import RecipeCondition from "../component/RecipeCondition/RecipeCondition";

const RecipePage = () => {
  const location = useLocation();
  const { category } = useParams();

  // URL 경로에서 마지막 부분 추출
  const pathArray = location.pathname.split("/");
  const path = pathArray[pathArray.length - 1];

  return (
    <Box>
      <RecipeCategory />
      <RecipeTitle
        title={
          path === "best"
            ? "베스트"
            : path === "new"
            ? "최신"
            : category
            ? category
            : "전체"
        }
        subtitle={
          path === "best"
            ? "베스트"
            : path === "new"
            ? "최신"
            : category
            ? category
            : "모든"
        }
      />
      {path === "new" || path === "best" ? (
        <RecipeCondition category={category} path={path} />
      ) : (
        <RecipeAll category={category} path={path} />
      )}
    </Box>
  );
};

export default RecipePage;
