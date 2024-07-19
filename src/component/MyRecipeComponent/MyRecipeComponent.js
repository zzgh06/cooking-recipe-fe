import React from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const HeadContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "baseline",
  borderBottom: "4px solid black",
  paddingLeft: "10px",
});

const MyRecipeComponent = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const recipes = useSelector((state) => state.recipe.recipes);

  
  const userRecipes = recipes.filter(
    (recipe) => recipe.userId === user.user._id
  );
  
  const handleRecipe = (id) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <>
      <Box mb={3}>
        <HeadContainer>
          <Typography variant="h5">나의 정보</Typography>
          <Typography variant="subtitle1">내 레시피</Typography>
        </HeadContainer>
      </Box>
      {userRecipes.length > 0 ? (
        <Grid container spacing={3}>
          {userRecipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={recipe._id}>
              <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={recipe.images[0] || "/default-image.jpg"}
                  alt={recipe.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div" noWrap>
                    {recipe.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {recipe.description || "No description available"}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleRecipe(recipe._id);
                    }}
                  >
                    보기
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body1">작성한 레시피가 없습니다.</Typography>
        </Box>
      )}
    </>
  );
};

export default MyRecipeComponent;
