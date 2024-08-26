import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import { currencyFormat } from "../../utils/number";
import {
  Card,
  CardMedia,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Checkbox,
  Box
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteCartItem } from "../../hooks/Cart/useDeleteCartItem";
import { useEditCartItem } from "../../hooks/Cart/useEditCartItem";

// interface CartItemProps {
//   item: {
//     name?: string;
//     price?: number;
//     unit?: string;
//     images?: string[];
//     _id?: string;
//   };
//   qty: number;
//   selectedItems: string[];
//   selectItem: (id: string) => void;
// }

const CartItem = ({ item = {}, qty, selectedItems, selectItem }) => {
  const dispatch = useDispatch();

  // 기본 값을 사용하여 비구조화 할당 오류 방지
  const { name = "알 수 없음", price = 0, unit = "단위", images = [], _id = "" } = item;
  const isSelected = selectedItems.includes(_id);
  const { mutate: deleteItem, isLoading: isDeleting } = useDeleteCartItem();
  const { mutate: editCartItem } = useEditCartItem();

  const handleSelectChange = () => {
    dispatch(selectItem(_id));
  };

  const handleQtyChange = (event) => {
    editCartItem({ ingredientId: _id, qty: event.target.value });
  };

  const handleDelete = () => {
    deleteItem({ ingredientId: _id }); 
  };

  const optimizedImageUrl = (url) =>
    url?.replace(/\/upload\//, "/upload/c_fill,h_200,w_200,f_webp/");

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
          image={images.length > 0 ? optimizedImageUrl(images[0]): "path/to/default/image.jpg"}
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
        onClick={handleDelete}
        sx={{ ml: 2, width: "20px" }}
        disabled={isDeleting}
      >
        <DeleteIcon />
      </IconButton>
    </Card>
  );
};

// PropTypes로 props 검증 추가
CartItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    unit: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    _id: PropTypes.string,
  }),
  qty: PropTypes.number.isRequired,
  selectedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectItem: PropTypes.func.isRequired,
};

export default CartItem;
