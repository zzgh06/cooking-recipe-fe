import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../redux/recipeSlice";
import RecipeAll from "../component/RecipeAll/RecipeAll";
import { styled, Box, Link, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const RecipeCategoryBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'fixed',
  top: '95px',
  width: '100%',
  height: '70px',
  padding: '0 120px',
  borderTop: '3px solid green',
  borderBottom: '3px solid green',
  backgroundColor: 'white',
  zIndex: 999,
  [theme.breakpoints.down('md')]: {
    display : 'none'
  },
}));

const RecipeBtn = styled(Box)({
  display: 'flex',
  gap: '25px',
});

const RecipeLink = styled(Link)({
  fontWeight: 600,
  textDecoration: 'none',
  color: 'black',
});

const RecipePage = () => {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useSelector((state) => state.recipe);

  useEffect(() => {
    const searchQuery = { name: "" };
    dispatch(fetchRecipes(searchQuery));
  }, [dispatch]);

  return (
    <Box>
      <RecipeCategoryBar>
        <RecipeBtn>
          <RecipeLink href="/recipes/all">전체 레시피</RecipeLink>
          <RecipeLink href="/recipes/new">최신 레시피</RecipeLink>
          <RecipeLink href="/recipes/korean">한식</RecipeLink>
          <RecipeLink href="/recipes/japanese">일식</RecipeLink>
          <RecipeLink href="/recipes/western">양식</RecipeLink>
          <RecipeLink href="/recipes/chinese">중식</RecipeLink>
        </RecipeBtn>
        <FontAwesomeIcon icon={faBars} />
      </RecipeCategoryBar>
      <RecipeAll />
    </Box>
  );
};

export default RecipePage;
