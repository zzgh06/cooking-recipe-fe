import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipesByCategory } from "../../redux/recipeSlice";
import RecipeCard from "../../component/RecipeCard/RecipeCard";
import RecipeCardSkeleton from "../../component/Skeleton/RecipeCardSkeleton";
import { Container, Grid, Box, Typography, styled } from "@mui/material";

const RecipeContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(6),
}));

const RecipeCardContainer = styled(Grid)({
  width: '100%',
});

const RecipeCondition = ({ category, path }) => {
  const dispatch = useDispatch();
  const { recipes, loading } = useSelector((state) => state.recipe);

  useEffect(() => {
    dispatch(fetchRecipesByCategory({ etc: category }));
  }, [dispatch, category]);

  // 정렬된 레시피 목록
  const bestRecipes = [...recipes].sort((a, b) => b.viewCnt - a.viewCnt);
  const newRecipes = [...recipes].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const filteredRecipes = path === "best"
    ? bestRecipes.slice(0, 16)
    : path === "new"
    ? newRecipes.slice(0, 16)
    : [];

  return (
    <RecipeContainer>
      <RecipeCardContainer container spacing={3}>
        {loading
          ? Array.from(new Array(8)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <RecipeCardSkeleton />
              </Grid>
            ))
          : filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={recipe._id}>
                  <RecipeCard item={recipe} />
                </Grid>
              ))
            ) : (
              <Box sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  현재 선택된 카테고리에 대한 레시피가 없습니다.
                </Typography>
              </Box>
            )}
      </RecipeCardContainer>
    </RecipeContainer>
  );
};

export default RecipeCondition;
