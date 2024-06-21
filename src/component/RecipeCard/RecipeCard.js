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
        src="https://ottogi.okitchen.co.kr/pds/upfile/2020-08-25_427865954%5B2%5D.jpg"
        alt=""
        onClick={() => showRecipe(item._id)}
      />
      <div className="card-disc">
        <div className="title">햄마요덮밥</div>
      </div>
    </div>
  );
};

export default RecipeCard;
