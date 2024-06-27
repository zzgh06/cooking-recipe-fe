import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../style/recipeSlider.style.css"; 
import { recipeResponsive } from "../../constants/responsive";
import RecipeCard from "../RecipeCard/RecipeCard";

const RecipeSlider = ({ title, recipes }) => {
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
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} item={recipe} />
        ))}
      </Carousel>
    </div>
  );
};

export default RecipeSlider;
