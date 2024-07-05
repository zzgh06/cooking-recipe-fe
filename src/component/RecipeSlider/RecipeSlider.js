import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../style/recipeSlider.style.css";
import { recipeResponsive } from "../../constants/responsive";
import RecipeCard from "../RecipeCard/RecipeCard";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const RecipeSlider = ({ title, recipes }) => {
  const navigate = useNavigate()
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

  const onClickMore = () => {
    if (title === '베스트 레시피') {
      navigate(`/recipes/best`);
    } else {
      navigate(`/recipes/new`);
    }
  };

  return (
    <div className="recipe-carousel-wrapper">
      <div className="recipe-title">
        <h3>{title}</h3>
        <Button
          size="small"
          endIcon={<FontAwesomeIcon icon={faCirclePlus} />}
          onClick={() => onClickMore()}
          sx={{ justifyContent: "flex-end", width : '80px', color : "black"}}
        >
          더보기
        </Button>
      </div>
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
