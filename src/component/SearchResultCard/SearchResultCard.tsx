import React from 'react';
import { useAddIngredientToFridge } from '../../hooks/Fridge/useAddIngredientToFridge';
import { Ingredient } from '../../types';

interface SearchResultCardProps {
  item: Ingredient;
}

const SearchResultCard = ({ item }: SearchResultCardProps) => {
  const { mutate: addIngredientToFridge, isPending } = useAddIngredientToFridge();

  const handleAddClick = () => {
    addIngredientToFridge(item._id);
  };

  return (
    <div className="flex items-center w-[350px] p-4 m-4 shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1">
      <img
        src={item.images[0]}
        alt={item.name}
        className="w-24 h-24 mr-4 rounded"
      />
      <div className="flex-grow">
        <div className="text-lg font-semibold mb-2 text-gray-900 truncate">
          {item.name}
        </div>
        <button
          onClick={handleAddClick}
          className={`mt-2 w-full bg-green-700 text-white py-2 rounded ${isPending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
            }`}
          disabled={isPending}
        >
          {isPending ? '추가 중...' : '추가'}
        </button>
      </div>
    </div>
  );
};

export default SearchResultCard;
