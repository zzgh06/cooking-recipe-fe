import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../style/ingredientsSlider.style.css";
import { ingredientResponsive } from "../../constants/responsive";
import IngredientCard from "../IngredientCard/IngredientCard";

const IngredientSlider = ({ title, ingredientsList }) => {
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
    <div className="ingredient-carousel-wrapper">
      <h3 className="ingredient-title">{title}</h3>
      <Carousel
        infinite={true}
        containerClass="ingredient-carousel-container"
        responsive={ingredientResponsive}
        customLeftArrow={<CustomLeftArrow2 />}
        customRightArrow={<CustomRightArrow2 />}
      >
        {ingredientsList.map((ing) => (
          <IngredientCard key={ing._id} item={ing} />
        ))}
      </Carousel>
    </div>
  );
};

export default IngredientSlider;
