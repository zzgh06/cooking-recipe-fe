import React from "react";
import "./IngredientCard.style.css";
import { useNavigate } from "react-router-dom";

const IngredientCard = ({item}) => {
  const navigate = useNavigate();
  const showIngredient = (id) => {
    navigate(`/ingredient/${id}`);
  };
  return (
    <div className="ingredient-card">
      <img
        src="https://img-cf.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/shop/data/goods/1653038233102l0.jpeg"
        alt=""
        onClick={()=>showIngredient()}
      />
      <div className="card-disc">
        <div className="title">초당 옥수수(알록이) 5입</div>
        <div className="price">9520원</div>
        <div className="discount-price"><span className="discount-rate">30% </span>6990원</div>
      </div>
    </div>
  );
};

export default IngredientCard;
