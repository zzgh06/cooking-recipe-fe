import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { recipeResponsive } from "../../constants/responsive";
import { Recipe } from "../../types";
import RecipeCard from "../RecipeCard/RecipeCard";
import RecipeCardSkeleton from "../Skeleton/RecipeCardSkeleton";

interface RecipeSliderProps {
  title: string;
  loading: boolean;
  recipes : Recipe[];
}

const RecipeSlider = ({ title, recipes, loading }: RecipeSliderProps) => {
  const navigate = useNavigate();

  const onClickMore = () => {
    if (title === "베스트 레시피") {
      navigate(`/recipes/best`);
    } else {
      navigate(`/recipes/new`);
    }
  };

  return (
    <div
      className="relative px-[50px] pt-[30px] w-full max-w-full h-auto md:px-[100px]"
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
      <div className="flex justify-between mb-4 px-4">
        <h5 className="text-[25px] font-semibold">{title}</h5>
        <button
          className="flex items-center text-sm text-gray-700 hover:text-black"
          onClick={onClickMore}
        >
          더보기
          <FontAwesomeIcon icon={faCirclePlus} className="ml-1" />
        </button>
      </div>
      <Carousel
        infinite={true}
        containerClass="recipe-carousel-container"
        responsive={recipeResponsive}
        customLeftArrow={
          <button
            className="custom-arrow-recipe absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white px-4 py-3 rounded-full hidden"
            style={{ zIndex: 2 }}
          >
            ◀
          </button>
        }
        customRightArrow={
          <button
            className="custom-arrow-recipe absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white px-4 py-3 rounded-full hidden"
            style={{ zIndex: 2 }}
          >
            ▶
          </button>
        }
      >
        {loading ? (
          Array.from(new Array(4)).map((_, index) => (
            <div key={index} className="w-full gap-1">
              <RecipeCardSkeleton />
            </div>
          ))
        ) : (
          recipes.map((recipe) => (
            <div key={recipe._id}>
              <RecipeCard item={recipe} />
            </div>
          ))
        )}
      </Carousel>
    </div>
  );
};

export default RecipeSlider;
