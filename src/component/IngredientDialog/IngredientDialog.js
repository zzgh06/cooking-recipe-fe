import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Checkbox,
  Box,
  Button,
} from "@mui/material";
import { setSelectedIngredients } from "../../redux/ingredientSlice";
import { useNavigate } from "react-router-dom";

const IngredientDialog = ({ open, handleClose, ingredients }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedIngredients = useSelector(
    (state) => state.ingredients.selectedIngredients
  );

  const [checkedIngredients, setCheckedIngredients] = useState(
    ingredients.map((ingredient) =>
      selectedIngredients?.includes(ingredient._id)
    )
  );

  const handleCheckboxChange = (index) => {
    const newCheckedIngredients = [...checkedIngredients];
    newCheckedIngredients[index] = !newCheckedIngredients[index];
    setCheckedIngredients(newCheckedIngredients);
  };

  const handleSave = () => {
    const selectedNames = ingredients
      .filter((_, index) => checkedIngredients[index])
      .map((ingredient) => ingredient.name);
    dispatch(setSelectedIngredients(selectedNames));
    handleClose();
    navigate('/fridge');
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>재료검색</DialogTitle>
      <DialogContent>
        <DialogContentText>아래 목록에서 재료를 선택하세요.</DialogContentText>
        <Box>
          {ingredients.map((ingredient, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={checkedIngredients[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
              }
              label={`${ingredient.name}`}
            />
          ))}
        </Box>
        <Box mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleSave} variant="contained" color="primary">
            재료 검색
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default IngredientDialog;
