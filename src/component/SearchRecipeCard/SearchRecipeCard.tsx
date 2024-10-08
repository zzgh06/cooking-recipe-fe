import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RecipeItem } from '../../types';

const SearchRecipeCard = ({ item }: { item: RecipeItem }) => {
  const navigate = useNavigate();
  const showRecipe = (id: string) => {
    navigate(`/recipe/${id}`);
  };
  return (
    <div className="max-w-xs m-2 border border-light-gray rounded-lg shadow-md overflow-hidden flex flex-col h-[360px]">
      <img
        className="w-full h-36 object-cover"
        src={item.images[0]}
        alt={item.title}
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <h2 className="text-lg font-semibold mb-2 line-clamp-1">{item.name}</h2>
        <p className="text-gray-600 line-clamp-4">
          {item.description}
        </p>
        <button
          className="w-full border border-blue-500 text-blue-500 rounded-md px-4 py-2 hover:bg-blue-500 hover:text-white transition duration-200 mt-2 self-end"
          onClick={() => { showRecipe(item._id); }}
        >
          상세 보기
        </button>
      </div>
    </div>
  );
};

export default SearchRecipeCard;