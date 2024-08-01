import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faSearch,
  faBookmark as solidBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import RecipeCategory from "../../component/RecipeCategory/RecipeCategory";
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
import KakaoShareButton from "../../component/KakaoShareButton/KakaoShareButton";
import CopyClipButton from "../../component/CopyClipButton/CopyClipButton";
import RecipeDetailSkeleton from "../../component/Skeleton/RecipeDetailSkeleton";
import { useFetchRecipeById } from "../../hooks/Recipe/useFetchRecipeById";
import { useRecipeFavorite } from "../../hooks/Favorite/useRecipeFavorite";
import { useAddRecipeFavorite } from "../../hooks/Favorite/useAddRecipeFavorite";
import { useDeleteRecipeFavorite } from "../../hooks/Favorite/useDeleteRecipeFavorite";

const Review = React.lazy(() => import("../../component/Review/Review"));
const IngredientDialog = React.lazy(() =>
  import("../../component/IngredientDialog/IngredientDialog")
);
const ShoppingListDialog = React.lazy(() =>
  import("../../component/ShoppingListDialog/ShoppingListDialog")
);

const ImageContainer = styled(Box)({
  position: "relative",
  width: "100%",
  maxHeight: "600px",
  overflow: "hidden",
  borderRadius: "8px",
  marginBottom: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const RecipeImage = styled("img")({
  width: "100%",
  height: "auto",
  display: "block",
});

const PlaceholderImage = styled("div")({
  width: "100%",
  minWidth: "852px",
  height: "100%",
  minHeight: "600px",
  borderRadius: "8px",
  backgroundColor: "#f0f0f0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "#ccc",
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

const RecipeIngredientButton = styled("div")({
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

const Steps = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "baseline",
  height: "187px",
  [theme.breakpoints.down("sm")]: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { data: recipeDetail, isLoading } = useFetchRecipeById(id);
  const [isFavorite, setIsFavorite] = useState(false);
  const [openIngredientDialog, setOpenIngredientDialog] = useState(false);
  const [openShoppingListDialog, setOpenShoppingListDialog] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const { data: recipeFavorite } = useRecipeFavorite();
  const { mutate: addRecipeFavorite } = useAddRecipeFavorite();
  const { mutate: deleteRecipeFavorite } = useDeleteRecipeFavorite();

  useEffect(() => {
    if (recipeDetail && recipeFavorite) {
      setIsFavorite(recipeFavorite?.recipes?.includes(recipeDetail._id));
    }
  }, [recipeDetail, recipeFavorite]);

  const handleFavoriteClick = () => {
    if (!user) {
      navigate("/login");
    }
    if (isFavorite) {
      deleteRecipeFavorite(recipeDetail._id);
    } else {
      addRecipeFavorite(recipeDetail._id);
    }
    setIsFavorite(!isFavorite);
  };

  const handleClickOpenIngredientDialog = () => {
    setOpenIngredientDialog(true);
  };

  const handleCloseIngredientDialog = () => {
    setOpenIngredientDialog(false);
  };

  const handleClickOpenShoppingListDialog = () => {
    setOpenShoppingListDialog(true);
  };

  const handleCloseShoppingListDialog = () => {
    setOpenShoppingListDialog(false);
  };

  const handlePurchaseClick = (ingredientName) => {
    navigate(`/ingredients?name=${encodeURIComponent(ingredientName)}`);
  };

  const getDifficultyStars = (difficulty) => {
    switch (difficulty) {
      case "아무나":
        return "⭐";
      case "초급":
        return "⭐⭐";
      case "중급":
        return "⭐⭐⭐";
      case "고급":
        return "⭐⭐⭐⭐";
      case "신의경지":
        return "⭐⭐⭐⭐⭐";
      default:
        return "";
    }
  };

  const optimizeMainImageUrl = (url) => {
    return url?.replace(/\/upload\//, "/upload/c_fill,h_1704,w_1704,f_webp/");
  };

  const optimizeSubImageUrl = (url) => {
    return url?.replace(/\/upload\//, "/upload/c_fill,h_200,w_200,f_webp/");
  };

  const optimizedMainImageUrl = optimizeMainImageUrl(recipeDetail?.images[0]);

  if (isLoading) {
    return <RecipeDetailSkeleton />;
  }

  return (
    <>
      <RecipeCategory />
      <Container maxWidth="md" sx={{ marginTop: "80px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ImageContainer>
              <RecipeImage
                src={optimizedMainImageUrl}
                alt={recipeDetail?.name}
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
              />
            </ImageContainer>
          </Grid>
          <Grid item xs={12}>
            <RecipeInfoContainer>
              <Typography
                variant="h4"
                component="h2"
                fontWeight="600"
                fontSize="27px"
              >
                {recipeDetail?.name}
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Box
                  onClick={handleFavoriteClick}
                  sx={{ cursor: "pointer", marginRight: "25px" }}
                >
                  {isFavorite && user ? (
                    <FontAwesomeIcon icon={solidBookmark} size="lg" />
                  ) : (
                    <FontAwesomeIcon icon={regularBookmark} size="lg" />
                  )}
                </Box>
                <Box sx={{ cursor: "pointer", marginRight: "20px" }}>
                  <KakaoShareButton recipeDetail={recipeDetail} />
                </Box>
                <Box sx={{ cursor: "pointer" }}>
                  <CopyClipButton recipeDetail={recipeDetail} />
                </Box>
              </Box>
            </RecipeInfoContainer>
            <Typography
              variant="body1"
              component="p"
              sx={{ marginBottom: "20px" }}
            >
              {recipeDetail?.description}
            </Typography>
            <DifficultyBox>
              <Typography variant="body2" component="p">
                난이도 : {getDifficultyStars(recipeDetail?.difficulty)}
              </Typography>
              <Typography variant="body2" component="p">
                소요시간 ⏰ : {recipeDetail?.time}
              </Typography>
            </DifficultyBox>
          </Grid>
          <Grid item xs={12}>
            <HeadContainer>
              <Typography variant="h5" component="p">
                재료
              </Typography>
            </HeadContainer>
            <RecipeIngredientButton>
              <StyledButton
                variant="outlined"
                onClick={handleClickOpenIngredientDialog}
              >
                <FontAwesomeIcon icon={faSearch} />
                <Box component="span" sx={{ ml: 1 }}>
                  재료검색
                </Box>
              </StyledButton>
              <StyledButton
                variant="outlined"
                onClick={handleClickOpenShoppingListDialog}
              >
                <FontAwesomeIcon icon={faCartShopping} />
                <Box component="span" sx={{ ml: 1 }}>
                  장보기
                </Box>
              </StyledButton>
            </RecipeIngredientButton>
            <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>재료</TableCell>
                    <TableCell align="right">양</TableCell>
                    <TableCell align="right">구매</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recipeDetail?.ingredients.map((ingredient, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {ingredient.name}
                      </TableCell>
                      <TableCell align="right">
                        {ingredient.qty}
                        {ingredient.unit}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          onClick={() => handlePurchaseClick(ingredient.name)}
                          sx={{ width: "150px" }}
                        >
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
              <Typography variant="h5" component="p" fontWeight="600">
                조리순서
              </Typography>
            </HeadContainer>
          </Grid>
          <Grid item xs={12}>
            {recipeDetail?.steps.map((step, index) => (
              <RecipeStepContainer key={index}>
                <Steps>
                  <Typography variant="h3" component="h3">
                    {index + 1}.
                  </Typography>
                  <Typography
                    variant="h6"
                    component="span"
                    ml={2}
                    fontWeight="600"
                  >
                    {step?.description}
                  </Typography>
                </Steps>
                {step?.image && (
                  <RecipeImage
                    src={optimizeSubImageUrl(step?.image)}
                    alt={step?._id}
                    sx={{
                      ml: 2,
                      width: "200px",
                      height: "auto",
                      maxHeight: "200px",
                    }}
                  />
                )}
              </RecipeStepContainer>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Suspense fallback={<CircularProgress />}>
              <Review type="recipe" itemId={recipeDetail?._id} />
            </Suspense>
          </Grid>
        </Grid>
      </Container>
      <Suspense fallback={<CircularProgress />}>
        <IngredientDialog
          open={openIngredientDialog}
          handleClose={handleCloseIngredientDialog}
          ingredients={recipeDetail?.ingredients}
        />
        <ShoppingListDialog
          open={openShoppingListDialog}
          handleClose={handleCloseShoppingListDialog}
          ingredients={recipeDetail?.ingredients}
        />
      </Suspense>
    </>
  );
};

export default RecipeDetail;
