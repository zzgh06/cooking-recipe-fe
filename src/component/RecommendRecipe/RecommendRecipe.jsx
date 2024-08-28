import React, { useCallback, useMemo } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const ImageContainer = styled(Box)({
  position: "relative",
  width: "100%",
  height: "100%",
  maxHeight: "600px",
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
  return url?.replace(/\/upload\//, "/upload/c_fill,h_1082,w_1082,f_webp/");
};

const RecommendRecipe = React.memo(({ recommendRecipes }) => {
  const navigate = useNavigate();

  const showRecipe = useCallback(
    (id) => {
      navigate(`/recipe/${id}`);
    },
    [navigate]
  );

  const optimizedImages = useMemo(() => {
    return recommendRecipes.map((recipe) =>
      optimizeImageUrl(recipe?.images[0])
    );
  }, [recommendRecipes]);

  return (
    <Container sx={{ padding: { xs: "30px", sm: "50px", md: "50px 100px" } }}>
      <Box sx={{ textAlign: "center", padding: "20px" }}>
        <Typography
          variant="h2"
          fontWeight="500"
          sx={{
            fontSize: { xs: "24px", sm: "30px", md: "35px" },
          }}
        >
          RECIPES FOR YOU
        </Typography>
        <Typography variant="body1">맞춤추천 레시피를 둘러보세요.</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6}>
          <ImageContainer onClick={() => showRecipe(recommendRecipes[0]?._id)}>
            <StyledImage
              src={optimizedImages[0]}
              alt={recommendRecipes[0]?.name}
              loading="lazy"
              decoding="async"
              width="600"
              height="600"
              srcSet={`${optimizedImages[0]} 600w, ${optimizedImages[0]?.replace(
                'h_1082,w_1082',
                'h_1200,w_1200'
              )} 1200w`}
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 600px"
            />
            <Overlay className="overlay">{recommendRecipes[0]?.name}</Overlay>
          </ImageContainer>
        </Grid>
        <Grid item lg={6} md={6} container spacing={2}>
          <Grid item lg={6} md={6} sm={6}>
            <ImageContainer
              onClick={() => showRecipe(recommendRecipes[1]?._id)}
              sx={{ maxHeight: "300px" }}
            >
              <StyledImage
                src={optimizedImages[1]}
                alt={recommendRecipes[1]?.name}
                loading="lazy"
                decoding="async"
                width="300"
                height="300"
                srcSet={`${optimizedImages[1]} 300w, ${optimizedImages[1]?.replace(
                  'h_1082,w_1082',
                  'h_600,w_600'
                )} 600w`}
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 300px"
              />
              <Overlay className="overlay">{recommendRecipes[1]?.name}</Overlay>
            </ImageContainer>
          </Grid>
          <Grid item lg={6} md={6} sm={6}>
            <ImageContainer
              onClick={() => showRecipe(recommendRecipes[2]?._id)}
              sx={{ maxHeight: "300px" }}
            >
              <StyledImage
                src={optimizedImages[2]}
                alt={recommendRecipes[2]?.name}
                loading="lazy"
                decoding="async"
                width="300"
                height="300"
                srcSet={`${optimizedImages[2]} 300w, ${optimizedImages[2]?.replace(
                  'h_1082,w_1082',
                  'h_600,w_600'
                )} 600w`}
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 300px"
              />
              <Overlay className="overlay">{recommendRecipes[2]?.name}</Overlay>
            </ImageContainer>
          </Grid>
          <Grid item lg={12}>
            <ImageContainer
              onClick={() => showRecipe(recommendRecipes[4]?._id)}
              sx={{
                maxHeight: {
                  xs: "300px",
                  sm: "300px",
                  md: "200px",
                  lg: "300px",
                },
              }}
            >
              <StyledImage
                src={optimizedImages[4]}
                alt={recommendRecipes[4]?.name}
                loading="lazy"
                decoding="async"
                width="600"
                height="300"
                srcSet={`${optimizedImages[4]} 600w, ${optimizedImages[4]?.replace(
                  'h_1082,w_1082',
                  'h_1200,w_600'
                )} 1200w`}
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 100vw, 600px"
              />
              <Overlay className="overlay">{recommendRecipes[4]?.name}</Overlay>
            </ImageContainer>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
});

export default RecommendRecipe;