import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box, Typography, IconButton, styled, Grid } from "@mui/material";
import IngredientCard from "../IngredientCard/IngredientCard";
import { ingredientResponsive } from "../../constants/responsive";
import IngredientCardSkeleton from "../Skeleton/IngredientCardSkeleton";

const IngredientCarouselWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: "50px 200px 10px 200px",
  width: "100vw",
  height: "auto",
  maxHeight: "1000px",
  minHeight: "500px",
  [theme.breakpoints.down("md")]: {
    padding: "30px 50px 10px 50px",
  },
}));

const IngredientTitle = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: "30px",
  fontWeight: 600,
  [theme.breakpoints.down("md")]: {
    marginBottom: "20px",
  },
}));

const CustomArrowIngredient = styled(IconButton)(({ theme }) => ({
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

const LeftArrow = styled(CustomArrowIngredient)({
  left: 0,
});

const RightArrow = styled(CustomArrowIngredient)({
  right: 0,
});

interface Ingredient {
  _id: string;
  name: string;
}

interface IngredientSliderProps {
  title: string;
  loading: boolean;
  ingredients: Ingredient[];
}

const IngredientSlider = ({ title, ingredients, loading }: IngredientSliderProps) => {
  const [carouselItems, setCarouselItems] = useState<Ingredient[]>([]);

  useEffect(() => {
    if (ingredients && ingredients.length > 0) {
      setCarouselItems(ingredients);
    }
  }, [ingredients]);

  return (
    <IngredientCarouselWrapper
      onMouseEnter={(e) => {
        const buttons = e.currentTarget.querySelectorAll(".custom-arrow-recipe");
        buttons.forEach((button) => {
          (button as HTMLElement).style.display = "block";
        });
      }}
      onMouseLeave={(e) => {
        const buttons = e.currentTarget.querySelectorAll(".custom-arrow-recipe");
        buttons.forEach((button) => {
          (button as HTMLElement).style.display = "none";
        });
      }}
    >
      <IngredientTitle variant="h4">{title}</IngredientTitle>
      <Carousel
        infinite={true}
        containerClass="ingredient-carousel-container"
        responsive={ingredientResponsive}
        customLeftArrow={<LeftArrow className="custom-arrow-recipe">◀</LeftArrow>}
        customRightArrow={<RightArrow className="custom-arrow-recipe">▶</RightArrow>}
      >
        {loading ? (
          Array.from(new Array(8)).map((_, index) => (
            <Grid key={index} xs={12} md={6} lg={3}>
              <IngredientCardSkeleton />
            </Grid>
          ))
        ) : (carouselItems.map((ing) => (
          <IngredientCard key={ing._id} item={ing} />
        )))}
      </Carousel>
    </IngredientCarouselWrapper>
  );
};

export default IngredientSlider;