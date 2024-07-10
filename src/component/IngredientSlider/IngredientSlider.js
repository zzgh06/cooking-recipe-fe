import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../style/ingredientsSlider.style.css";
import IngredientCard from "../IngredientCard/IngredientCard";
import {
  ingredientResponsive,
  recipeResponsive,
} from "../../constants/responsive";

const IngredientSlider = ({ title, ingredients }) => {
  const [carouselItems, setCarouselItems] = useState([]);

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

  useEffect(() => {
    if (ingredients && ingredients.length > 0) {
      setCarouselItems(ingredients);
    }
  }, [ingredients]);
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
        {carouselItems.map((ing) => {

          return <IngredientCard key={ing._id} item={ing} />;
        })}
      </Carousel>
    </div>
  );
};

export default IngredientSlider;
