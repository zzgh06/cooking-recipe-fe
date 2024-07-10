import React from 'react';
import { Typography, Box } from '@mui/material';

const RecipeTitle = ({ title, subtitle }) => {

  return (
    <Box textAlign="center" paddingBottom={2} marginTop={14}>
      <Typography variant="h4" fontWeight="600">
        {title} 레시피
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        What’s in your fridge의 {subtitle} 레시피를 모두 만나보세요
      </Typography>
    </Box>
  );
};

export default RecipeTitle;