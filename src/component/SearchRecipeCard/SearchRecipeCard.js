import React from 'react';
import "../../style/searchRecipeCard.style.css"
import { useNavigate } from 'react-router-dom';

const SearchRecipeCard = ({item}) => {
  console.log("SearchRecipeCard", item)
  const navigate = useNavigate();
  const showRecipe = (id) => {
    navigate(`/recipe/${id}`);
  };
  return (
    <div className='search-recipe-card' onClick={() => {showRecipe(item._id)}}>
      <div className='search-recipe-card__img'>
        <img src={item.images} alt={item.name} />
      </div>
      <div className='search-recipe-card__desc'>
        <p className='search-recipe-card__name'>{item.name}</p>
      </div>
    </div>
  )
}

export default SearchRecipeCard