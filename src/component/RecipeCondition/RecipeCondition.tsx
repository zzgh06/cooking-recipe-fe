import React from "react";
import { useFetchRecipesByCategory } from "../../hooks/Recipe/useFetchRecipesByCategory";
import RecipeCard from "../RecipeCard/RecipeCard";
import RecipeCardSkeleton from "../Skeleton/RecipeCardSkeleton";
import { Recipe } from "../../types";

interface RecipeConditionProps {
  category: string;
  path: string;
}

const RecipeCondition = ({ category, path }: RecipeConditionProps) => {
  const queryParams = { etc: category };
  const { data, isLoading } = useFetchRecipesByCategory(queryParams);
  const bestRecipes = [...(data?.recipeList || [])].sort((a: Recipe, b: Recipe) => (b.viewCnt || 0) - (a.viewCnt || 0));
  const newRecipes = [...(data?.recipeList || [])].sort((a: Recipe, b: Recipe) =>
    new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  );

  const filteredRecipes = path === "best"
    ? bestRecipes?.slice(0, 16)
    : path === "new"
      ? newRecipes?.slice(0, 16)
      : [];

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from(new Array(8)).map((_, index) => (
            <div key={index}>
              <RecipeCardSkeleton />
            </div>
          ))
          : filteredRecipes && filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe: Recipe) => (
              <div key={recipe._id}>
                <RecipeCard item={recipe} />
              </div>
            ))
          ) : (
            <div className="w-full text-center mt-8">
              <p className="text-gray-500">현재 선택된 카테고리에 대한 레시피가 없습니다.</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default RecipeCondition;
