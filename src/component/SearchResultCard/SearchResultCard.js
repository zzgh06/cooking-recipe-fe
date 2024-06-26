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
        <img src={item.image} alt={item.name} />
      </div>
      <div className='search-resultCard__desc'>
        <p className='search-resultCard__name'>{item.name}</p>
        <div className='search-resultCard__buttons'>
          <button className='button-add' onClick={handleAddClick}>추가</button>
          <button className='button-recipe'>레시피<br/> 알아보기</button>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
