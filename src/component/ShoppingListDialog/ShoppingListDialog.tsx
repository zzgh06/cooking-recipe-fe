import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddToShoppingList } from "../../hooks/ShoppingList/useAddToShoppingList";
import { useQueryClient } from "@tanstack/react-query";
import { Ingredient } from "../../types";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setToastMessage } from "../../redux/commonUISlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

interface ShoppingListDialogProps {
  open: boolean;
  handleClose: () => void;
  ingredients: { name: string; qty: number; unit: string; }[];
}

const isFullIngredient = (ingredient: Ingredient | { name: string; qty: number; unit: string }): ingredient is Ingredient => {
  return (ingredient as Ingredient)._id !== undefined;
};


const ShoppingListDialog = ({ open, handleClose, ingredients }: ShoppingListDialogProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [allChecked, setAllChecked] = useState(true);
  const queryClient = useQueryClient();
  const addToShoppingListMutation = useAddToShoppingList();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (open) {
      const initialCheckedItems = ingredients.reduce((acc, ingredient) => {
        if (isFullIngredient(ingredient)) {
          acc[ingredient._id] = allChecked;
        }
        return acc;
      }, {} as Record<string, boolean>);
      setCheckedItems(initialCheckedItems);
    }
  }, [open, ingredients, allChecked]);

  const handleCheckboxChange = (ingredient: Ingredient | { name: string; qty: number; unit: string; }) => {
    if (isFullIngredient(ingredient)) {
      setCheckedItems((prevState) => ({
        ...prevState,
        [ingredient._id]: !prevState[ingredient._id],
      }));
    }
  };

  const handleSaveList = async () => {
    if (!user) {
      dispatch(setToastMessage({
        message: "로그인이 필요한 서비스입니다.",
        status: "error",
      }));
      return;
    }

    const selectedIngredients = ingredients.filter(
      (ingredient) => isFullIngredient(ingredient) && checkedItems[ingredient._id]
    );
    try {
      await addToShoppingListMutation.mutateAsync(selectedIngredients);
      queryClient.invalidateQueries({ queryKey: ["shoppingList"] });
      navigate("/account/profile");
      handleClose();
    } catch (error) {
      console.error("Error adding to shopping list:", error);
    }
  };

  const handleToggleAll = () => {
    const newCheckedState = !allChecked;
    const updatedCheckedItems = ingredients.reduce((acc, ingredient) => {
      if (isFullIngredient(ingredient)) {
        acc[ingredient._id] = newCheckedState;
      }
      return acc;
    }, {} as Record<string, boolean>);
    setCheckedItems(updatedCheckedItems);
    setAllChecked(newCheckedState);
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${open ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative z-10">
        <button
          onClick={handleClose}
          className="absolute top-7 right-5 text-gray-500 hover:text-gray-700"
        >
          <FontAwesomeIcon icon={faClose} size="xl" />
        </button>
        <h2 className="text-xl font-semibold mb-4">재료 선택</h2>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg">재료를 선택하세요</h3>
          <span
            onClick={handleToggleAll}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            {allChecked ? "모두 해제" : "모두 선택"}
          </span>
        </div>
        <div className="flex flex-wrap gap-4 mb-4">
          {ingredients.map((ingredient) =>
            isFullIngredient(ingredient) ? (
              <label key={ingredient._id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={!!checkedItems[ingredient._id]}
                  onChange={() => handleCheckboxChange(ingredient)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span>{ingredient.name}</span>
              </label>
            ) : null
          )}
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSaveList}
            className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
          >
            {checkedCount} 개의 재료 장보기 메모에 추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingListDialog;
