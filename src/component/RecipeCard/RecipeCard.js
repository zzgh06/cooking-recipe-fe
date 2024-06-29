import React from "react";
import "../../style/RecipeCard.style.css";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ item }) => {

  const navigate = useNavigate();
  const showRecipe = (id) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="recipe-card">
      <img
        src={item.images}
        alt={item.name}
        onClick={() => showRecipe(item._id)}
      />
      <div className="card-disc">
        <div className="title">{item.name}</div>
      </div>
    </div>
  );
};

export default RecipeCard;
