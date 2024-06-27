import React from "react";
import "../../style/fridgeItemCard.style.css";
import { useDispatch } from "react-redux";
import { deleteFridgeItem, fetchFridgeItems } from "../../redux/fridgeSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faTrashCan, faCircle } from "@fortawesome/free-regular-svg-icons";

const FridgeItemCard = ({ item, id, isChecked, onCheckboxChange }) => {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    await dispatch(deleteFridgeItem(id));
    dispatch(fetchFridgeItems());
  };
  console.log("FridgeItemCard", id);
  return (
    <div className="fridge-item-card">
      <div className="fridge-item-card-icon">
      <FontAwesomeIcon
        icon={isChecked ? faCircleCheck : faCircle}
        onClick={onCheckboxChange}
        className="fridge-item-checkbox"
      />
        <button className="fridge-item-delete-button" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrashCan}/>
        </button>
      </div>
      <img src={item.image} alt={item.name} className="fridge-item-image" />
      <p className="fridge-item-name">{item.name}</p>
    </div>
  );
};

export default FridgeItemCard;
