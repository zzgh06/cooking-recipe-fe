import React from "react";
import "../../style/ingredientCard.style.css";
import { useNavigate } from "react-router-dom";

const IngredientCard = ({item}) => {
  const navigate = useNavigate();
  const showIngredient = (id) => {
    navigate(`/ingredients/${id}`);
  };
  return (
    <div className="ingredient-card">
      <img
        alt={item?.image}
        src={item?.image}
        onClick={()=>showIngredient(item?._id)}
      />
      <div className="card-disc">
        <div className="title">{item?.name}</div>
        <div className="price">{item?.price}원</div>
        <div className="discount-price"><span className="discount-rate">30% </span>6990원</div>
      </div>
    </div>
  );
};

export default IngredientCard;
