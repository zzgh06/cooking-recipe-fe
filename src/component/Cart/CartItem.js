import React from "react";
import { useDispatch } from "react-redux";
import { editCartItem, deleteCartItem } from "../../redux/cartSlice";
import { currencyFormat } from "../../utils/number";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Checkbox,
  Box
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CartItem = ({ item, qty, selectedItems, selectItem }) => {
  const { name, price, unit, images, _id } = item.ingredientId;
  const dispatch = useDispatch();

  const handleQtyChange = (event) => {
    dispatch(editCartItem({ ingredientId: _id, qty: event.target.value }));
  };

  const deleteItem = () => {
    dispatch(deleteCartItem({ ingredientId: _id }));
  };

  const isSelected = selectedItems.includes(_id);

  return (
    <Card sx={{ display: 'flex', mb: 2, p: 2, alignItems: 'center', border: "1px solid lightgrey", boxShadow: "none" }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flex: '1 0 auto', gap: 2 }}>
        <Checkbox
          checked={isSelected}
          onChange={() => selectItem(_id)}
          color="success"
        />
        <CardMedia
          component="img"
          sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 1 }}
          image={images[0]}
          alt={name}
        />
        <Box sx={{ flex: '1 0 auto' }}>
          <Typography variant="h6" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {unit}
          </Typography>
          <Typography variant="h6" component="div" sx={{ mt: 1 }}>
            ₩ {currencyFormat(price * qty)}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, ml: 2 }}>
        <Typography variant="body2" color="text.secondary">
          갯수
        </Typography>
        <Select
          value={qty}
          onChange={handleQtyChange}
          defaultChecked
          sx={{ minWidth: 60 }}
        >
          {[...Array(10).keys()].map((n) => (
            <MenuItem key={n + 1} value={n + 1}>
              {n + 1}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <IconButton
        aria-label="delete"
        color="error"
        onClick={deleteItem}
        sx={{ ml: 2, width: "20px" }}
      >
        <DeleteIcon />
      </IconButton>
    </Card>
  );
};

export default CartItem;
