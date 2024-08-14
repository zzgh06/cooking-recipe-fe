import React from "react";
import { useFetchRecipesByCategory } from "../../hooks/Recipe/useFetchRecipesByCategory";
import RecipeCard from "../RecipeCard/RecipeCard";
import RecipeCardSkeleton from "../Skeleton/RecipeCardSkeleton";
import { Container, Grid, Box, Typography, styled } from "@mui/material";

const RecipeContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(6),
}));

const RecipeCardContainer = styled(Grid)({
  width: '100%',
});

const RecipeCondition = ({ category, path }) => {
  const queryParams = { etc: category };
  const { data, isLoading } = useFetchRecipesByCategory(queryParams);
  const bestRecipes = data?.recipeList.sort((a, b) => b.viewCnt - a.viewCnt);
  const newRecipes = data?.recipeList.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const filteredRecipes = path === "best"
    ? bestRecipes?.slice(0, 16)
    : path === "new"
    ? newRecipes?.slice(0, 16)
    : [];

  return (
    <RecipeContainer>
      <RecipeCardContainer container spacing={3}>
        {isLoading
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
