import { Container, Grid, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const ImageContainer = styled(Box)({
  position: "relative",
  width: "100%",
  height: "100%",
  "&:hover .overlay": {
    opacity: 1,
  },
});

const Overlay = styled(Box)({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  height: "100%",
  width: "100%",
  opacity: 0,
  transition: "0.4s ease",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontSize: "20px",
});

const StyledImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "all 0.3s",
});

const optimizeImageUrl = (url) => {
  return url?.replace(/\/upload\//, '/upload/f_webp/');
};

const RecommendRecipe = ({ recommendRecipes }) => {
  const navigate = useNavigate();

  const showRecipe = (id) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <Container sx={{ padding: "80px" }}>
      <Box sx={{ textAlign: "center", padding: "20px" }}>
        <Typography variant="h2" fontWeight="500" fontSize="35px">
          RECIPES FOR YOU
        </Typography>
        <Typography variant="body1">맞춤추천 레시피를 둘러보세요.</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item lg={6} md={12} sm={12}>
          <ImageContainer
            onClick={() => {
              showRecipe(recommendRecipes[0]?._id);
            }}
          >
            <StyledImage
              src={optimizeImageUrl(recommendRecipes[0]?.images[0])}
              alt={recommendRecipes[0]?.name}
              loading="lazy"
            />
            <Overlay className="overlay">{recommendRecipes[0]?.name}</Overlay>
          </ImageContainer>
        </Grid>
        <Grid item lg={6} container spacing={2}>
          <Grid item lg={6} md={6} sm={12}>
            <ImageContainer
              onClick={() => {
                showRecipe(recommendRecipes[1]._id);
              }}
            >
              <StyledImage
                src={optimizeImageUrl(recommendRecipes[1]?.images[0])}
                alt={recommendRecipes[1]?.name}
                loading="lazy"
              />
              <Overlay className="overlay">{recommendRecipes[1]?.name}</Overlay>
            </ImageContainer>
          </Grid>
          <Grid item lg={6} md={6} sm={12}>
            <ImageContainer
              onClick={() => {
                showRecipe(recommendRecipes[2]._id);
              }}
            >
              <StyledImage
                src={optimizeImageUrl(recommendRecipes[2]?.images[0])}
                alt={recommendRecipes[2]?.name}
                loading="lazy"
              />
              <Overlay className="overlay">{recommendRecipes[2]?.name}</Overlay>
            </ImageContainer>
          </Grid>
          <Grid item lg={12}>
            <ImageContainer
              onClick={() => {
                showRecipe(recommendRecipes[4]._id);
              }}
            >
              <StyledImage
                src={optimizeImageUrl(recommendRecipes[4]?.images[0])}
                alt={recommendRecipes[4]?.name}
                loading="lazy"
              />
              <Overlay className="overlay">{recommendRecipes[4]?.name}</Overlay>
            </ImageContainer>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecommendRecipe;