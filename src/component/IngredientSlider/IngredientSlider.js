import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box, Typography, IconButton, styled } from "@mui/material";
import IngredientCard from "../IngredientCard/IngredientCard";
import { ingredientResponsive } from "../../constants/responsive";

const IngredientCarouselWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: "50px 200px 10px 200px",
  width: "100vw",
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

const IngredientSlider = ({ title, ingredients }) => {
  const [carouselItems, setCarouselItems] = useState([]);

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
          button.style.display = "block";
        });
      }}
      onMouseLeave={(e) => {
        const buttons = e.currentTarget.querySelectorAll(".custom-arrow-recipe");
        buttons.forEach((button) => {
          button.style.display = "none";
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
        {carouselItems.map((ing) => (
          <IngredientCard key={ing._id} item={ing} />
        ))}
      </Carousel>
    </IngredientCarouselWrapper>
  );
};

export default IngredientSlider;
