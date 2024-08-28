import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Modal,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AddCircleOutline } from "@mui/icons-material";
import { useFetchRecipes } from "../../hooks/Recipe/useFetchRecipes";
import RecipeForm from "../RecipeForm/RecipeForm";
import { useEditRecipe } from "../../hooks/Recipe/useEditRecipe";

const HeadContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "baseline",
  borderBottom: "4px solid black",
  paddingLeft: "10px",
});

const NoRecipesContainer = styled(Box)({
  textAlign: "center",
  marginTop: "40px",
  padding: "20px",
  borderRadius: "8px",
  backgroundColor: "#f2f2f2",
  border: "2px dashed #ccc",
});

const NoRecipesMessage = styled(Typography)({
  color: "#555",
  fontSize: "1.2rem",
  fontWeight: "bold",
  fontStyle: "italic",
});

const MyRecipeComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const { data : recipesData, refetch } = useFetchRecipes();
  const { mutate: editRecipe } = useEditRecipe();

  const userRecipes = recipesData?.recipes.filter(
    (recipe) => recipe.userId === user?._id
  );

  const handleRecipe = (id) => {
    navigate(`/recipe/${id}`);
  };

  const openEditForm = (recipe) => {
    setSelectedRecipe(recipe);
    setMode("edit");
    setShowForm(true);
  };

  const handleFormSubmit = (recipeData) => {
    editRecipe({ id: selectedRecipe._id, updatedData: recipeData });
    refetch();
    setShowForm(false);
  };

  return (
    <>
      <Container>
        <Box mb={3}>
          <HeadContainer>
            <Typography variant="h5">나의 정보</Typography>
            <Typography variant="subtitle1">내 레시피</Typography>
          </HeadContainer>
        </Box>
        {userRecipes?.length > 0 ? (
          <Grid container spacing={3}>
            {userRecipes?.map((recipe) => (
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
                  <Box
                    sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => openEditForm(recipe)}
                      sx={{ marginRight: "10px" }}
                    >
                      수정
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleRecipe(recipe._id)}
                    >
                      보기
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <NoRecipesContainer>
            <NoRecipesMessage>작성한 레시피가 없습니다.</NoRecipesMessage>
            <Button
              size="large"
              endIcon={<AddCircleOutline />}
              onClick={() => navigate("/account/recipe")}
              sx={{
                justifyContent: "flex-end",
                width: "170px",
                color: "black",
              }}
            >
              레시피 등록하기
            </Button>
            <Typography variant="body2" sx={{ marginTop: "8px" }}>
              새로운 레시피를 추가하려면 위의 버튼을 클릭하세요.
            </Typography>
          </NoRecipesContainer>
        )}

        <Modal
          open={showForm}
          onClose={() => setShowForm(false)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "scroll",
          }}
        >
          <Box
            sx={{
              p: 3,
              width: "80%",
              maxWidth: 800,
              maxHeight: "80vh",
              overflowY: "auto",
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
            }}
          >
            <Typography variant="h6" gutterBottom>
              {mode === "new" ? "Add New Recipe" : "Edit Recipe"}
            </Typography>
            <RecipeForm
              onSubmit={handleFormSubmit}
              initialData={selectedRecipe}
            />
          </Box>
        </Modal>
      </Container>
    </>
  );
};

export default MyRecipeComponent;
