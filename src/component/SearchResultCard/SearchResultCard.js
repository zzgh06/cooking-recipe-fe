import React from 'react';
import "../../style/searchResultCard.style.css";
import { useDispatch } from 'react-redux';
import { addIngredientToFridge, fetchFridgeItems } from '../../redux/fridgeSlice';

const SearchResultCard = ({ item }) => {
  const dispatch = useDispatch();
  const handleAddClick = () => {
    dispatch(addIngredientToFridge(item._id));
    dispatch(fetchFridgeItems())
  };
  return (
    <div className='search-resultCard'>
      <div className='search-resultCard__img'>
        <img src={item.images[0]} alt={item.name} />
      </div>
      <div className='search-resultCard__desc'>
        <p className='search-resultCard__name'>{item.name}</p>
          <button className='button-add' onClick={handleAddClick}>추가</button>
      </div>
    </div>
  );
};

export default SearchResultCard;
