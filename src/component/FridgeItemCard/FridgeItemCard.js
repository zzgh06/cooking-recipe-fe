import React from "react";
import "../../style/fridgeItemCard.style.css";

const FridgeItemCard = ({ item }) => {
  return (
    <div className="fridge-item-card">
      <img src={item.image} alt={item.name} className="fridge-item-image" />
      <p className="fridge-item-name">{item.name}</p>
    </div>
  );
};

export default FridgeItemCard;
