import React from "react";
import { useDispatch } from "react-redux";
import { deleteFridgeItem, fetchFridgeItems } from "../../redux/fridgeSlice";
import { Box, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle as faCircleRegular, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faCheckCircle as faCheckCircleSolid } from "@fortawesome/free-solid-svg-icons";

const FridgeItemCard = ({ item, id, isChecked, onCheckboxChange }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteFridgeItem(id));
    dispatch(fetchFridgeItems());
  };

  return (
    <Card sx={{ width: 120, height: 150, margin: 1, position: 'relative', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}>
      <CardActions sx={{ position: 'absolute', top: -3, left: -2, zIndex: 1 }}>
        <IconButton onClick={onCheckboxChange} size="small">
          <FontAwesomeIcon icon={isChecked ? faCheckCircleSolid : faCircleRegular} />
        </IconButton>
      </CardActions>
      <Box sx={{ position: 'absolute', top: 5, right: 6, zIndex: 1 }}>
        <IconButton onClick={handleDelete} size="small" color="warning">
          <FontAwesomeIcon icon={faTrashAlt} />
        </IconButton>
      </Box>
      <CardMedia
        component="img"
        image={item.images[0]}
        alt={item.name}
        sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '50%', margin: 'auto', marginTop: 3 }}
      />
      <CardContent sx={{ padding: '8px', textAlign: 'center' }}>
        <Typography variant="body2" fontWeight="bold" noWrap>
          {item.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FridgeItemCard;
