import React from 'react';
import { useSearchParams } from 'react-router-dom';
import RecipeCard from '../component/RecipeCard/RecipeCard';
import IngredientCard from '../component/IngredientCard/IngredientCard';
import { Grid, Box, CircularProgress, Typography, Divider } from '@mui/material';
import { useFetchRecipes } from '../hooks/Recipe/useFetchRecipes';
import { useFetchIngredients } from '../hooks/Recipe/useFetchIngredients';

const SearchResults = () => {
  const [query] = useSearchParams();
  const keyword = query.get('name') || '';

  const {
    data: recipesData,
    isLoading: recipesLoading,
  } = useFetchRecipes({ name: keyword }) 

  const {
    data: ingredientsData,
    isLoading: ingredientsLoading,
  } = useFetchIngredients({ name: keyword, page: 1 }) 

  console.log("ingredientsData", ingredientsData)
  const isLoading = recipesLoading || ingredientsLoading;

  return (
    <Box sx={{ padding: { xs: "20px", md: "50px 150px" }, minHeight: "500px" }}>
      <Typography variant="h4" sx={{ marginBottom: "30px", textAlign: "center" }}>
        검색결과 "{keyword}"
      </Typography>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
          <CircularProgress size="80px" sx={{ color: 'green' }} />
        </Box>
      ) : (
        <>
          <Typography variant="h5" fontWeight="600" gutterBottom sx={{ mb: 3 }}>
            레시피 검색 결과
          </Typography>
          {recipesData && recipesData.recipes.length === 0 ? (
            <Typography variant="body1" fontSize="20px">
              레시피 검색 결과가 없습니다. 😅
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {recipesData && recipesData.recipes.map((recipe) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={recipe._id}>
                  <RecipeCard item={recipe} />
                </Grid>
              ))}
            </Grid>
          )}

          <Divider sx={{ my: 5 }} />

          <Typography variant="h5" fontWeight="600" gutterBottom sx={{ mb: 3 }}>
            재료 검색 결과
          </Typography>
          {ingredientsData && ingredientsData.data.ingredients.length === 0 ? (
            <Typography variant="body1" fontSize="20px">
              재료 검색 결과가 없습니다. 😅
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {ingredientsData && ingredientsData.data.ingredients.map((ing) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={ing._id}>
                  <IngredientCard item={ing} />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Box>
  );
};

export default SearchResults;
