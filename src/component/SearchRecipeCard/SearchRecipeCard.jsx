import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Box, Button } from "@mui/material";

const SearchRecipeCard = ({ item }) => {
  const navigate = useNavigate();
  const showRecipe = (id) => {
    navigate(`/recipe/${id}`);
  };
  return (
    <Card sx={{ maxWidth: 345, margin: 2, border: "1px solid lightgrey" }}>
      <CardMedia
        component="img"
        height="140"
        image={item.images[0]}
        alt={item.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" fontWeight="600">
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{marginBottom: "10px"}}>
          {item.description}
        </Typography>
        <Box>
          <Button variant='outlined' size="medium" color="primary" onClick={()=>{showRecipe(item._id)}}>
            상세 보기
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SearchRecipeCard;
