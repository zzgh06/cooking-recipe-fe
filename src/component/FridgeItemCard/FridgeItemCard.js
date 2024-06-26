import React from "react";
import "../../style/fridgeItemCard.style.css";
import { useDispatch } from "react-redux";
import { deleteFridgeItem, fetchFridgeItems } from "../../redux/fridgeSlice";

const FridgeItemCard = ({ item, id }) => {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    await dispatch(deleteFridgeItem(id));
    dispatch(fetchFridgeItems());
  };
  console.log("FridgeItemCard", id)
  return (
    <div className="fridge-item-card">
      <button className="fridge-item-delete-button" onClick={handleDelete}>
        X
      </button>
      <img src={item.image} alt={item.name} className="fridge-item-image" />
      <p className="fridge-item-name">{item.name}</p>
    </div>
  );
};

export default FridgeItemCard;
