import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { Ingredient } from "../../types";
import { setSelectedIngredients } from "../../redux/ingredientSlice";
import { setToastMessage } from "../../redux/commonUISlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

interface IngredientDialogProps {
  open: boolean;
  handleClose: () => void;
  ingredients: Ingredient[] | { name: string; qty: number; unit: string; }[];
}

const isFullIngredient = (ingredient: any): ingredient is Ingredient => {
  return (ingredient as Ingredient)._id !== undefined;
};

const IngredientDialog = ({ open, handleClose, ingredients }: IngredientDialogProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const selectedIngredients = useSelector(
    (state: RootState) => state.ingredients?.selectedIngredients ?? []
  );

  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>(
    ingredients.map((ingredient) =>
      isFullIngredient(ingredient)
        ? selectedIngredients.some(selected => selected._id === ingredient._id)
        : false
    )
  );

  useEffect(() => {
    setCheckedIngredients(
      ingredients.map((ingredient) =>
        isFullIngredient(ingredient)
          ? selectedIngredients.some(selected => selected._id === ingredient._id)
          : false
      )
    );
  }, [ingredients, selectedIngredients]);

  const handleCheckboxChange = (index: number) => {
    const newCheckedIngredients = [...checkedIngredients];
    newCheckedIngredients[index] = !newCheckedIngredients[index];
    setCheckedIngredients(newCheckedIngredients);
  };

  const handleSave = () => {
    if (user) {
      const selectedIngredientsToSave = ingredients.filter(
        (ingredient, index) => checkedIngredients[index] && isFullIngredient(ingredient)
      ) as Ingredient[];
      dispatch(setSelectedIngredients(selectedIngredientsToSave));
      handleClose();
      navigate('/fridge');
    } else {
      dispatch(setToastMessage({ message: "로그인이 필요한 서비스 입니다.", status: "error" }));
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${open ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={handleClose}
          className="absolute top-7 right-5 text-gray-500 hover:text-gray-700"
        >
          <FontAwesomeIcon icon={faClose} size="xl" />
        </button>
        <h2 className="text-xl font-semibold mb-4">재료검색</h2>
        <p className="mb-4">아래 목록에서 재료를 선택하세요.</p>
        <div className="flex flex-wrap gap-4 mb-4">
          {ingredients.map((ingredient, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={checkedIngredients[index]}
                onChange={() => handleCheckboxChange(index)}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span>{ingredient.name}</span>
            </label>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            재료 검색
          </button>
        </div>
      </div>
    </div>
  );
};

export default IngredientDialog;