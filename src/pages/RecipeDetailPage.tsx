import React, { useEffect, useState, useCallback, Suspense } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faSearch,
  faBookmark as solidBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import RecipeCategory from "../component/RecipeCategory/RecipeCategory";
import {
  Box,
  Button,
  Container,
  Grid,
  styled,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import KakaoShareButton from "../component/KakaoShareButton/KakaoShareButton";
import CopyClipButton from "../component/CopyClipButton/CopyClipButton";
import RecipeDetailSkeleton from "../component/Skeleton/RecipeDetailSkeleton";
import { useFetchRecipeById } from "../hooks/Recipe/useFetchRecipeById";
import { useRecipeFavorite } from "../hooks/Favorite/useRecipeFavorite";
import { useAddRecipeFavorite } from "../hooks/Favorite/useAddRecipeFavorite";
import { useDeleteRecipeFavorite } from "../hooks/Favorite/useDeleteRecipeFavorite";
import { RootState } from "../redux/store";

const Review = React.lazy(() => import("../component/Review/Review"));
const IngredientDialog = React.lazy(() =>
  import("../component/IngredientDialog/IngredientDialog")
);
const ShoppingListDialog = React.lazy(() =>
  import("../component/ShoppingListDialog/ShoppingListDialog")
);

const ImageContainer = styled(Box)({
  position: "relative",
  width: "100%",
  aspectRatio: "16 / 9",
  borderRadius: "8px",
  marginBottom: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const RecipeImage = styled("img")({
  display: "block",
  width: "100%",
  height: "auto",
  aspectRatio: "16/9"
});

const RecipeInfoContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
});

const DifficultyBox = styled(Box)({
  display: "flex",
  gap: "20px",
  marginTop: "10px",
  paddingBottom: "30px",
  borderBottom: "3px solid lightgrey",
});

const HeadContainer = styled("div")({
  marginTop: "20px",
});

const RecipeIngredientButton = styled(Box)({
  display: "flex",
  padding: "10px 15px",
});

const StyledButton = styled(Button)({
  width: "150px",
  marginRight: "15px",
  "&:last-child": {
    marginRight: 0,
  },
});

const RecipeStepContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
  width: "100%",
});

const Steps = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "baseline",
  height: "187px",
  [theme.breakpoints.down("sm")]: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

interface Step {
  _id?: string;
  image: string | null;
  description: string;
}

interface IngredientSummary {
  name: string;
  qty: number;
  unit: string;
}

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: recipeDetail, isLoading } = useFetchRecipeById(id || "");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [openIngredientDialog, setOpenIngredientDialog] = useState<boolean>(false);
  const [openShoppingListDialog, setOpenShoppingListDialog] = useState<boolean>(false);
  const { data: recipeFavorite } = useRecipeFavorite();
  const { mutate: addRecipeFavorite } = useAddRecipeFavorite();
  const { mutate: deleteRecipeFavorite } = useDeleteRecipeFavorite();

  useEffect(() => {
    if (recipeDetail && recipeFavorite) {
      setIsFavorite(recipeFavorite.recipes.includes(recipeDetail._id));
    }
  }, [recipeDetail, recipeFavorite]);

  const handleFavoriteClick = useCallback(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (isFavorite && recipeDetail) {
      deleteRecipeFavorite(recipeDetail._id);
    } else if (recipeDetail) {
      addRecipeFavorite(recipeDetail._id);
    }
    setIsFavorite((prev) => !prev);
  }, [isFavorite, user, navigate, recipeDetail, addRecipeFavorite, deleteRecipeFavorite]);

  const handleClickOpenIngredientDialog = () => setOpenIngredientDialog(true);
  const handleCloseIngredientDialog = () => setOpenIngredientDialog(false);

  const handleClickOpenShoppingListDialog = () => setOpenShoppingListDialog(true);
  const handleCloseShoppingListDialog = () => setOpenShoppingListDialog(false);

  const handlePurchaseClick = useCallback((ingredientName: string) => {
    navigate(`/ingredients?name=${encodeURIComponent(ingredientName)}`);
  }, [navigate]);

  const getDifficultyStars = (difficulty: string) => {
    const stars: { [key: string]: string } = {
      "아무나": "⭐",
      "초급": "⭐⭐",
      "중급": "⭐⭐⭐",
      "고급": "⭐⭐⭐⭐",
      "신의경지": "⭐⭐⭐⭐⭐",
    };
    return stars[difficulty] || "";
  };

  const optimizeMainImageUrl = (url: string) => url?.replace(/\/upload\//, '/upload/c_fill,h_1704,w_1704,f_webp/');
  const optimizeSubImageUrl = (url: string) => url?.replace(/\/upload\//, '/upload/c_fill,h_200,w_200,f_webp/');

  if (isLoading) {
    return <RecipeDetailSkeleton />;
  }

  if (!recipeDetail) {
    return <Typography>레시피를 찾을 수 없습니다.</Typography>;
  }

  const optimizedMainImageUrl = recipeDetail.images[0] ? optimizeMainImageUrl(recipeDetail.images[0]) : "";

  return (
    <>
      <RecipeCategory />
      <Container maxWidth="md" sx={{ marginTop: "80px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ImageContainer>
              <RecipeImage src={optimizedMainImageUrl} alt={recipeDetail.name} />
            </ImageContainer>
          </Grid>
          <Grid item xs={12}>
            <RecipeInfoContainer>
              <Typography variant="h4" component="h2" fontWeight="600" fontSize="27px">
                {recipeDetail.name}
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Box onClick={handleFavoriteClick} sx={{ cursor: "pointer", marginRight: "25px" }}>
                  <FontAwesomeIcon icon={isFavorite && user ? solidBookmark : regularBookmark} size="lg" />
                </Box>
                <Box sx={{ cursor: "pointer", marginRight: "20px" }}>
                  <KakaoShareButton recipeDetail={recipeDetail} />
                </Box>
                <Box sx={{ cursor: "pointer" }}>
                  <CopyClipButton recipeDetail={recipeDetail} />
                </Box>
              </Box>
            </RecipeInfoContainer>
            <Typography variant="body1" component="p" sx={{ marginBottom: "20px" }}>
              {recipeDetail.description}
            </Typography>
            <DifficultyBox>
              <Typography variant="body2" component="p">
                난이도 : {getDifficultyStars(recipeDetail.difficulty)}
              </Typography>
              <Typography variant="body2" component="p">
                소요시간 ⏰ : {recipeDetail.time}
              </Typography>
            </DifficultyBox>
          </Grid>
          <Grid item xs={12}>
            <HeadContainer>
              <Typography variant="h5" component="p">재료</Typography>
            </HeadContainer>
            <RecipeIngredientButton>
              <StyledButton
                variant="outlined"
                onClick={handleClickOpenIngredientDialog}
              >
                <FontAwesomeIcon icon={faSearch} />
                <Box component="span" sx={{ ml: 1 }}>재료검색</Box>
              </StyledButton>
              <StyledButton
                variant="outlined"
                onClick={handleClickOpenShoppingListDialog}
              >
                <FontAwesomeIcon icon={faCartShopping} />
                <Box component="span" sx={{ ml: 1 }}>장보기</Box>
              </StyledButton>
            </RecipeIngredientButton>
            <TableContainer component={Paper} sx={{ boxShadow: "none", height: "auto", maxHeight: "800px" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>재료</TableCell>
                    <TableCell align="right">양</TableCell>
                    <TableCell align="right">구매</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(recipeDetail.ingredients as IngredientSummary[]).map((ingredient, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{ingredient.name}</TableCell>
                      <TableCell align="right">{ingredient.qty}{ingredient.unit}</TableCell>
                      <TableCell align="right">
                        <Button variant="outlined" onClick={() => handlePurchaseClick(ingredient.name)}>
                          구매
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12}>
            <HeadContainer>
              <Typography variant="h5" component="p" fontWeight="600">조리순서</Typography>
            </HeadContainer>
          </Grid>
          <Grid item xs={12}>
            {recipeDetail.steps.map((step: Step, index: number) => (
              <RecipeStepContainer key={index}>
                <Steps>
                  <Typography variant="h3" component="h3">{index + 1}.</Typography>
                  <Typography variant="h6" component="span" ml={2} fontWeight="600">
                    {step.description}
                  </Typography>
                </Steps>
                {step.image && (
                  <RecipeImage
                    src={optimizeSubImageUrl(step.image)}
                    alt={step._id}
                    sx={{ ml: 2, width: "200px", height: "auto", maxHeight: "200px" }}
                  />
                )}
              </RecipeStepContainer>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Suspense fallback={<CircularProgress />}>
              <Review type="recipe" itemId={recipeDetail._id || ""} />
            </Suspense>
          </Grid>
        </Grid>
      </Container>
      <Suspense fallback={<CircularProgress />}>
        <IngredientDialog
          open={openIngredientDialog}
          handleClose={handleCloseIngredientDialog}
          ingredients={recipeDetail.ingredients}
        />
        <ShoppingListDialog
          open={openShoppingListDialog}
          handleClose={handleCloseShoppingListDialog}
          ingredients={recipeDetail.ingredients}
        />
      </Suspense>
    </>
  );
};

export default RecipeDetail;
