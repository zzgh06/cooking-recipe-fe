import React, { useEffect, useState } from "react";
import { useFetchRecipesByCategory } from "../../hooks/Recipe/useFetchRecipesByCategory";
import RecipeCard from "../RecipeCard/RecipeCard";
import RecipeCardSkeleton from "../Skeleton/RecipeCardSkeleton";
import { Container, Grid, Typography, Pagination, Box, styled } from "@mui/material";
import { Recipe } from "../../types";

const RecipeAllContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "30px auto",
});

const RecipeCardContainer = styled(Grid)({
  width: '100%',
});

const NoRecipesMessage = styled(Typography)({
  marginTop: '20px',
  color: '#888',
  fontStyle: 'italic',
});

interface RecipeAllProps {
  category : string;
}

const RecipeAll = ({ category }: RecipeAllProps) => {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, refetch } = useFetchRecipesByCategory({
    etc: category,
    page: page.toString(),
  });

  useEffect(() => {
    refetch();
  }, [category, page, refetch]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const recipes: Recipe[] = data?.recipeList || [];
  const totalPages: number = data?.totalPages || 1;

  return (
    <RecipeAllContainer>
      <RecipeCardContainer container spacing={1}>
        {isLoading
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
