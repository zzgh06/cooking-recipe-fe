import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box, Typography, Button, IconButton, styled, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AddCircleOutline } from "@mui/icons-material";
import RecipeCard from "../RecipeCard/RecipeCard";
import { recipeResponsive } from "../../constants/responsive";
import RecipeCardSkeleton from "../Skeleton/RecipeCardSkeleton";

const RecipeCarouselWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: "50px 100px 10px 100px",
  width: "100vw",
  [theme.breakpoints.down("md")]: {
    padding: "40px 50px 0 50px",
  },
}));

const CustomArrowRecipe = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "40%",
  transform: "translateY(-70%)",
  background: "rgba(0, 0, 0, 0.4)",
  color: "white",
  fontSize: "20px",
  cursor: "pointer",
  zIndex: 2,
  padding: "5px",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  display: "none",
  "&:hover": {
    background: "rgba(0, 0, 0, 0.6)",
  },
  [theme.breakpoints.down("md")]: {
    width: "40px",
    height: "40px",
    fontSize: "15px",
  },
}));

const LeftArrow = styled(CustomArrowRecipe)({
  left: 0,
});

const RightArrow = styled(CustomArrowRecipe)({
  right: 0,
});

const RecipeSlider = ({ title, recipes, loading }) => {
  const navigate = useNavigate();

  const onClickMore = () => {
    if (title === "베스트 레시피") {
      navigate(`/recipes/best`);
    } else {
      navigate(`/recipes/new`);
    }
  };

  return (
    <RecipeCarouselWrapper
      onMouseEnter={(e) => {
        const buttons = e.currentTarget.querySelectorAll(
          ".custom-arrow-recipe"
        );
        buttons.forEach((button) => {
          button.style.display = "block";
        });
      }}
      onMouseLeave={(e) => {
        const buttons = e.currentTarget.querySelectorAll(
          ".custom-arrow-recipe"
        );
        buttons.forEach((button) => {
          button.style.display = "none";
        });
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 15px",
          marginBottom: "10px",
          fontWeight: "600",
        }}
      >
        <Typography variant="h5" fontWeight="600">{title}</Typography>
        <Button
          size="small"
          endIcon={<AddCircleOutline />}
          onClick={onClickMore}
          sx={{ justifyContent: "flex-end", width: "80px", color: "black" }}
        >
          더보기
        </Button>
      </Box>
      <Carousel
        infinite={true}
        containerClass="recipe-carousel-container"
        responsive={recipeResponsive}
        customLeftArrow={
          <LeftArrow className="custom-arrow-recipe">◀</LeftArrow>
        }
        customRightArrow={
          <RightArrow className="custom-arrow-recipe">▶</RightArrow>
        }
      >
        {loading ? (
          Array.from(new Array(8)).map((_, index) => (
            <Grid item key={index} xs={12} md={6} lg={3}>
              <RecipeCardSkeleton />
            </Grid>
          ))
        ) : (recipes.map((recipe) => (
          <RecipeCard key={recipe._id} item={recipe} />
        )))}
      </Carousel>
    </RecipeCarouselWrapper>
  );
};

export default RecipeSlider;
