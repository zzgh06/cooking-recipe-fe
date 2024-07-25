import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import { addIngredientToFridge, fetchFridgeItems } from '../../redux/fridgeSlice';

const SearchResultCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddClick = () => {
    dispatch(addIngredientToFridge(item._id));
    dispatch(fetchFridgeItems());
  };

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', width: 350, p: 2, m: 2, boxShadow: 3, '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 }, transition: 'transform 0.2s, box-shadow 0.2s' }}>
      <CardMedia
        component="img"
        sx={{ width: 100, height: 100, mr: 2, borderRadius: 1 }}
        image={item.images[0]}
        alt={item.name}
      />
      <Box sx={{ flexGrow: 1 }}>
        <CardContent sx={{ p: 0 }}>
          <Typography variant="h6" sx={{ mb: 1, color: 'text.primary' }}>{item.name}</Typography>
        </CardContent>
        <Button variant="contained" color="success" onClick={handleAddClick} sx={{ mt: 1, width: "100%" }}>추가</Button>
      </Box>
    </Card>
  );
};

export default SearchResultCard;
