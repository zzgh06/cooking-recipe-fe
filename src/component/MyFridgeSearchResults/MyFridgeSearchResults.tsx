import React from "react";
import SearchRecipeCard from "../SearchRecipeCard/SearchRecipeCard";
import { RecipeItem } from "../../types";

interface MyFridgeSearchResultsProps {
  recipeList: RecipeItem[];
}

const MyFridgeSearchResults = ({ recipeList }: MyFridgeSearchResultsProps) => {
  return (
    <div className="p-4">
      {recipeList?.length === 0 ? (
        <div className="h-72 flex flex-col justify-center items-center text-center">
          <p className="text-2xl p-1">추천 레시피가 없습니다.</p>
          <p className="text-lg">
            당신만의 레시피로 What’s in your fridge를 가득 채워주세요. 👨‍🍳👩‍🍳
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recipeList.map((item) => (
            <div key={item._id} className="w-full">
              <SearchRecipeCard item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFridgeSearchResults;
