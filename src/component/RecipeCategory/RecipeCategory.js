import { Box, Link, styled } from '@mui/material';
import React from 'react'
import { etcCategory } from '../../constants/recipe.constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const RecipeCategory = () => {
  const navigate = useNavigate();
  const RecipeCategoryBar = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    top: "95px",
    width: "100%",
    height : "auto",
    padding: "10px 120px",
    borderTop: "3px solid green",
    borderBottom: "3px solid green",
    backgroundColor: "white",
    zIndex: 999,
    [theme.breakpoints.down("md")]: {
      top: "70px",
      padding: "0 10px",
    },
  }));
  
  const RecipeBtn = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  }));
  
  const RecipeLink = styled(Link)(({ theme }) => ({
    fontWeight: 600,
    textDecoration: "none",
    color: "black",
    padding: "5px 10px",
    transition: "all 0.3s ease",
    "&:hover": {
      color: "white",
    },
    width:"10%",
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
      width: "15%", 
    },
  }));
  return (
    <RecipeCategoryBar>
        <RecipeBtn>
          <RecipeLink onClick={() => navigate(`/recipes/all`)} component="button" sx={{minWidth : "125px"}}>
            전체 레시피
          </RecipeLink>
          <RecipeLink onClick={() => navigate(`/recipes/best`)} component="button" sx={{minWidth : "125px"}}>
            베스트 레시피
          </RecipeLink>
          <RecipeLink onClick={() => navigate(`/recipes/new`)} component="button" sx={{minWidth : "125px"}}>
            최신 레시피
          </RecipeLink>
          {etcCategory.map((category) => (
            <RecipeLink
              key={category}
              onClick={() => navigate(`/recipes/${category}`)}
              component="button"
              sx={{width : "80px"}}
            >
              {category}
            </RecipeLink>
          ))}
        </RecipeBtn>
        <FontAwesomeIcon icon={faBars} />
      </RecipeCategoryBar>
  )
}

export default RecipeCategory