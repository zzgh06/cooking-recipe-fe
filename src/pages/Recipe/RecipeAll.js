import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipesByCategory } from "../../redux/recipeSlice";
import RecipeCard from "../../component/RecipeCard/RecipeCard";
import RecipeCardSkeleton from "../../component/Skeleton/RecipeCardSkeleton";
import { Container, Grid, Typography, Pagination, Box, styled } from "@mui/material";

const RecipeAllContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "30px auto"
});

const RecipeCardContainer = styled(Grid)({
  width: '100%',
});

const NoRecipesMessage = styled(Typography)({
  marginTop: '20px',
  color: '#888',
  fontStyle: 'italic',
});

const RecipeAll = ({ category, path }) => {
  const dispatch = useDispatch();
  const { recipes, loading, totalPages } = useSelector((state) => state.recipe);
  const [page, setPage] = useState(1);
  const [prevCategory, setPrevCategory] = useState(category);

  useEffect(() => {
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
    <RecipeAllContainer>
      <RecipeCardContainer container spacing={1}>
        {loading
          ? Array.from(new Array(8)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <RecipeCardSkeleton />
              </Grid>
            ))
          : recipes.length > 0 ? (
              recipes.map((recipe) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={recipe._id}>
                  <RecipeCard item={recipe} />
                </Grid>
              ))
            ) : (
              <NoRecipesMessage>작성한 레시피가 없습니다.</NoRecipesMessage>
            )}
      </RecipeCardContainer>
      {totalPages > 1 && (
        <Box sx={{ mt: 4 }}>
          <Pagination
            count={totalPages}
            size="large"
            page={page}
            onChange={handlePageChange}
            sx={{ display: 'flex', justifyContent: 'center' }}
          />
        </Box>
      )}
    </RecipeAllContainer>
  );
};

export default RecipeAll;
