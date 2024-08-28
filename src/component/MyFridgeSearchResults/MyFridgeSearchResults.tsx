import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import SearchRecipeCard from "../SearchRecipeCard/SearchRecipeCard";

interface RecipeItem {
  _id: string;
  [key: string]: any;
}

interface MyFridgeSearchResultsProps {
  recipeList: RecipeItem[];
}

const MyFridgeSearchResults = ({ recipeList }: MyFridgeSearchResultsProps) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2} justifyContent="center">
        {recipeList?.length === 0 ? (
          <Box height="300px" textAlign="center" alignContent="center">
            <Typography variant="body1" fontSize="30px" sx={{ p: 1 }}>
              추천 레시피가 없습니다.
            </Typography>
            <Typography variant="body1" fontSize="17px">
              당신만의 레시피로 What’s in your fridge를 가득 채워주세요. 👨‍🍳👩‍🍳
            </Typography>
          </Box>
        ) : (
          recipeList?.map((item) => (
            <Grid item key={item._id} xs={12} sm={6} md={4}>
              <SearchRecipeCard item={item} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default MyFridgeSearchResults;
