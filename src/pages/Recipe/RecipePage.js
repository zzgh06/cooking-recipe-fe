import React from "react";
import { Box } from "@mui/material";
import RecipeAll from "./RecipeAll";
import { useLocation, useParams } from "react-router-dom";
import RecipeTitle from "../../component/RecipeTitle/RecipeTitle";
import RecipeCategory from "../../component/RecipeCategory/RecipeCategory";


const RecipePage = () => {
  const location = useLocation();
  const { category } = useParams();

  // URL 경로에서 마지막 부분 추출
  const pathArray = location.pathname.split('/');
  const path = pathArray[pathArray.length - 1];
  return (
    <Box>
      <RecipeCategory />
      <RecipeTitle title={category ? category : "전체"} subtitle={category ? category : "모든"} />
      <RecipeAll category={category} path={path}/>
    </Box>
  );
};

export default RecipePage;
