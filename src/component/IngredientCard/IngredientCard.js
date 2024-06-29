import React from "react";
import "../../style/ingredientCard.style.css";
import { useNavigate } from "react-router-dom";

const IngredientCard = ({ item }) => {
  const navigate = useNavigate();

  const showIngredient = (id) => {
    navigate(`/ingredients/${id}`);
  };

  const calculateDiscountedPrice = (price, discountRate) => {
    const discountedPrice = price * (1 - discountRate / 100);
    return Math.floor(discountedPrice); // 소수점 이하 버림
  };

  return (
    <div className="ingredient-card">
      <img
        alt={item?.image}
        src={item?.image}
        onClick={() => showIngredient(item?._id)}
      />
      <div className="card-disc">
        <div className="title">{item?.name}</div>
        <div className="price">
          {item?.discountPrice ? (
            <>
              <div className="origin-price">
                {item?.price}원
              </div>
              <div className="discount-rate">
                {item?.discountPrice}%{" "}
                <span className="discount-price">
                  {calculateDiscountedPrice(item?.price, item?.discountPrice)}원
                </span>
              </div>
            </>
          ) : (
            <div className="price">
              {item?.price}원
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IngredientCard;
