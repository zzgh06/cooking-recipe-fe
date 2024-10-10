import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import IngredientCard from "../IngredientCard/IngredientCard";
import { ingredientResponsive } from "../../constants/responsive";
import IngredientCardSkeleton from "../Skeleton/IngredientCardSkeleton";
import { Ingredient } from "../../types";

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
    <div
      className="relative px-[50px] py-[50px] w-full max-w-full h-auto max-h-[1000px] min-h-[500px] md:px-[100px] md:py-[30px]"
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
      <h4 className="flex justify-center mb-[30px] font-semibold md:mb-[20px] text-[32px]">{title}</h4>
      <Carousel
        infinite={true}
        containerClass="ingredient-carousel-container"
        responsive={ingredientResponsive}
        customLeftArrow={
          <div className="absolute left-0 top-[40%] transform -translate-y-1/2 bg-black bg-opacity-40 text-white text-[20px] cursor-pointer z-20 px-4 py-3 rounded-full custom-arrow-recipe">
            ◀
          </div>
        }
        customRightArrow={
          <div className="absolute right-0 top-[40%] transform -translate-y-1/2 bg-black bg-opacity-40 text-white text-[20px] cursor-pointer z-20 px-4 py-3 rounded-full custom-arrow-recipe">
            ▶
          </div>
        }
      >
        {loading ? (
          Array.from(new Array(4)).map((_, index) => (
            <div key={index} className="w-full gap-1">
              <IngredientCardSkeleton />
            </div>
          ))
        ) : (
          carouselItems.map((ing) => (
            <IngredientCard key={ing._id} item={ing} />
          ))
        )}
      </Carousel>
    </div>
  );
};

export default IngredientSlider;
