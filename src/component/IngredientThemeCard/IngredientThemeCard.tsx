import React from "react";
import IngredientCard from "../IngredientCard/IngredientCard";
import { Box, Container, Grid, Typography } from "@mui/material";
import IngredientCardSkeleton from "../Skeleton/IngredientCardSkeleton";
import { Ingredient } from "../../types";

interface IngredientThemeCardProps {
  ingredients: Ingredient[];
  loading: boolean;
}

const IngredientThemeCard = ({ ingredients, loading }: IngredientThemeCardProps) => {
  return (
    <Container >
      <Grid container spacing={3} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Grid item lg={3}>
          <Typography variant="h4" fontSize="28px" fontWeight="600">📣 빅세일 추천특가</Typography>
          <Typography variant="subtitle1" component="p">
            상반기 인기 상품 득템 찬스
          </Typography>
        </Grid>
        <Grid item lg={9}>
          <Box sx={{ display: "flex", overflowX: "auto" }}>
            {loading ?
              Array.from(new Array(2)).map((_, index) => (
              <Grid key={index} item xs={12} md={6} lg={3}>
                <IngredientCardSkeleton />
              </Grid>
              ))
            : ingredients.map((ing) => (
              <Box key={ing._id} sx={{ marginRight: 2 }}>
                <IngredientCard item={ing} sx={{ minWidth: "275px"}}/>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default IngredientThemeCard;