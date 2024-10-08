import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle as faCircleRegular, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faCheckCircle as faCheckCircleSolid } from "@fortawesome/free-solid-svg-icons";
import { useDeleteFridgeItem } from "../../hooks/Fridge/useDeleteFridgeItem";

interface FridgeItemCardProps {
  id : string;
  isChecked: boolean;
  onCheckboxChange: (e: React.MouseEvent<HTMLButtonElement>) => void;
  item : {
    images: string[];
    name: string;
  }
}

const FridgeItemCard = ({ item, id, isChecked, onCheckboxChange }: FridgeItemCardProps) => {
  const {mutate: deleteFridgeItem} = useDeleteFridgeItem();

  const handleDelete = async () => {
    deleteFridgeItem(id);
  };

  const optimizeImageUrl = (url: string): string => {
    return url.replace(/\/upload\//, '/upload/c_fill,h_160,w_160,f_auto,q_auto,f_webp/');
  };

  return (
    <div className="relative min-w-[90px] w-[120px] h-[150px] m-2 transition-transform transform hover:scale-105 bg-white shadow-md rounded-lg flex flex-col items-center justify-end">
      <div className="absolute top-4 left-3 z-10">
        <button onClick={onCheckboxChange} className="text-gray-600">
          <FontAwesomeIcon icon={isChecked ? faCheckCircleSolid : faCircleRegular} />
        </button>
      </div>
      <div className="absolute top-4 right-3 z-10">
        <button onClick={handleDelete} className="text-red-500">
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
      <img
        src={optimizeImageUrl(item.images[0])}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-full"
      />
      <div className="text-center p-2 w-full">
        <p className="text-sm font-bold truncate w-full">{item.name}</p>
      </div>
    </div>
  );
};

export default FridgeItemCard;