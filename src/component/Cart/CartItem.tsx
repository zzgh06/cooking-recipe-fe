import React from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardMedia,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Checkbox,
  Box,
  SelectChangeEvent
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteCartItem } from "../../hooks/Cart/useDeleteCartItem";
import { useEditCartItem } from "../../hooks/Cart/useEditCartItem";
import { currencyFormat } from "../../utils/number";
import { AppDispatch } from "../../redux/store";
import { toggleSelectItem } from "../../redux/cartSlice";

interface CartItemProps {
  item: {
    name: string;
    price?: number;
    unit?: string;
    images: string[];
    _id?: string;
  };
  qty: number;
  selectedItems: string[]
}

const CartItem= ({ item, qty, selectedItems }: CartItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const isSelected = item._id ? selectedItems.includes(item._id) : false;
  const { mutate: deleteItem, isPending: isDeleting } = useDeleteCartItem();
  const { mutate: editCartItem } = useEditCartItem();

  const handleSelectChange = () => {
    if (item._id) {
      dispatch(toggleSelectItem(item._id));
    }
  };
  

  const handleQtyChange = (event: SelectChangeEvent<number>) => {
    const value = event.target.value;
    if (item._id) {
      editCartItem({ ingredientId: item._id, qty: value });
    }
  };
  const handleDelete = () => {
    if (item._id) {
      deleteItem({ ingredientId: item._id });
    }
  };

  const optimizedImageUrl = (url: string) =>
    url.replace(/\/upload\//, "/upload/c_fill,h_200,w_200,f_webp/");

  const quantityOptions: number[] = Array.from(Array(10).keys()).map(n => n + 1);

  return (
    <Card sx={{ display: 'flex', mb: 2, p: 2, alignItems: 'center', border: "1px solid lightgrey", boxShadow: "none" }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flex: '1 0 auto', gap: 2 }}>
        <Checkbox
          checked={isSelected}
          onChange={handleSelectChange}
          color="success"
        />
        <CardMedia
          component="img"
          sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 1 }}
          image={item.images.length > 0 ? optimizedImageUrl(item.images[0]) : "path/to/default/image.jpg"}
          alt={item.name}
        />
        <Box sx={{ flex: '1 0 auto' }}>
          <Typography variant="h6" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.unit}
          </Typography>
          <Typography variant="h6" component="div" sx={{ mt: 1 }}>
            ₩ {currencyFormat((item.price || 0) * qty)}
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
          sx={{ minWidth: 60 }}
        >
          {quantityOptions.map(n => (
            <MenuItem key={n} value={n}>
              {n}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <IconButton
        aria-label="delete"
        color="error"
        onClick={handleDelete}
        sx={{ ml: 2, width: "20px" }}
        disabled={isDeleting}
      >
        <DeleteIcon />
      </IconButton>
    </Card>
  );
};

export default CartItem;
