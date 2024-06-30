import React from "react";
import SearchRecipeCard from "../SearchRecipeCard/SearchRecipeCard";

const MyFridgeSearchResults = ({recipeList}) => {
  return (
    <div className="recommend-recipe">
      <h2>레시피 추천</h2>
      <div className="recipe-list-container">
        {recipeList.length === 0 ? (
          <p>추천 레시피가 없습니다.</p>
        ) : (
          recipeList.map((item) => (
            <SearchRecipeCard key={item._id} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyFridgeSearchResults;
