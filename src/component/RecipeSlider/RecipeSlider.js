import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../style/recipeSlider.style.css"; // Use a separate stylesheet for RecipeSlider
import { recipeResponsive } from "../../constants/responsive";
import RecipeCard from "../RecipeCard/RecipeCard";

const RecipeSlider = ({ title, recipe }) => {
  const CustomLeftArrow2 = ({ onClick }) => (
    <button className="custom-arrow-recipe left-recipe" onClick={onClick}>
      ◀
    </button>
  );

  const CustomRightArrow2 = ({ onClick }) => (
    <button className="custom-arrow-recipe right-recipe" onClick={onClick}>
      ▶
    </button>
  );

  return (
    <div className="recipe-carousel-wrapper">
      <h3 className="recipe-title">{title}</h3>
      <Carousel
        infinite={true}
        containerClass="recipe-carousel-container"
        responsive={recipeResponsive}
        customLeftArrow={<CustomLeftArrow2 />}
        customRightArrow={<CustomRightArrow2 />}
      >
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </Carousel>
    </div>
  );
};

export default RecipeSlider;
