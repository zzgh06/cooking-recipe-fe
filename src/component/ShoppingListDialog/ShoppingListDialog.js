import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
  styled,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToShoppingList } from "../../redux/ingredientSlice";

const HeadContainer = styled(Box)({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "baseline",
  borderBottom: "2px solid black",
  paddingLeft: "10px",
});

const FixedSizeDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: '400px',
    maxWidth: '500px',
    height: '350px',
    maxHeight: '400px', 
  },
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(2),
  overflowY: 'auto', 
}));

const ShoppingListDialog = ({ open, handleClose, ingredients }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [allChecked, setAllChecked] = useState(true); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      const initialCheckedItems = ingredients?.reduce((acc, ingredient) => {
        acc[ingredient._id] = allChecked;
        return acc;
      }, {});
      setCheckedItems(initialCheckedItems);
    }
  }, [open, ingredients, allChecked]);

  const handleCheckboxChange = (ingredient) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [ingredient._id]: !prevState[ingredient._id],
    }));
  };

  const handleSaveList = () => {
    const selectedIngredients = ingredients?.filter(
      (ingredient) => checkedItems[ingredient._id]
    );
  
    dispatch(addToShoppingList(selectedIngredients));
    
    navigate("/account/profile");
    handleClose();
  };
  const handleToggleAll = () => {
    const newCheckedState = !allChecked;
    const updatedCheckedItems = ingredients?.reduce((acc, ingredient) => {
      acc[ingredient._id] = newCheckedState;
      return acc;
    }, {});
    setCheckedItems(updatedCheckedItems);
    setAllChecked(newCheckedState);
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <FixedSizeDialog open={open} onClose={handleClose}>
      <HeadContainer>
        <DialogTitle>재료 선택</DialogTitle>
      </HeadContainer>
      <StyledDialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            재료를 선택하세요
          </Typography>
          <Typography
            variant="h6"
            onClick={handleToggleAll}
            fontSize="15px"
            sx={{ cursor: "pointer" }}
          >
            {allChecked ? "모두 해제" : "모두 선택"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {ingredients?.map((ingredient) => (
            <Box key={ingredient._id} sx={{ flexBasis: "calc(50% - 8px)" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!checkedItems[ingredient._id]}
                    onChange={() => handleCheckboxChange(ingredient)}
                  />
                }
                label={ingredient.name}
                sx={{ width: "100%" }}
              />
            </Box>
          ))}
        </Box>
      </StyledDialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSaveList} color="success">
          {checkedCount} 개의 재료 장보기 메모에 추가
        </Button>
      </DialogActions>
    </FixedSizeDialog>
  );
};

export default ShoppingListDialog;
