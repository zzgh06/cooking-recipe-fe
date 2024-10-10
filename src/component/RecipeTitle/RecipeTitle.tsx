import React from 'react';
import { Typography, Box, styled } from '@mui/material';

const RecipeTitleBox = styled(Box)(({ theme }) =>({
  textAlign:"center",
  paddingBottom: "30px", 
  marginTop: "130px",
  [theme.breakpoints.down("md")]: {
    marginTop: "150px",
  },
}));

interface RecipeTitleProps {
  title : string;
  subtitle : string;
}

const RecipeTitle = ({ title, subtitle }: RecipeTitleProps) => {

  return (
    <RecipeTitleBox>
      <Typography variant="h4" fontWeight="600" sx={{mt: "160px"}}>
        {title} 레시피
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        What’s in your fridge의 {subtitle} 레시피를 모두 만나보세요
      </Typography>
    </RecipeTitleBox>
  );
};

export default RecipeTitle;