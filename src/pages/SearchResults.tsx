import React from 'react';
import { useSearchParams } from 'react-router-dom';
import RecipeCard from '../component/RecipeCard/RecipeCard';
import IngredientCard from '../component/IngredientCard/IngredientCard';
import { useFetchRecipes } from '../hooks/Recipe/useFetchRecipes';
import { useFetchIngredients } from '../hooks/Ingredient/useFetchIngredients';


const SearchResults = () => {
  const [query] = useSearchParams();
  const keyword = query.get('name') || '';

  const {
    data: recipesData,
    isLoading: recipesLoading,
  } = useFetchRecipes({ name: keyword })

  const {
    data: ingredientsData,
    isLoading: ingredientsLoading,
  } = useFetchIngredients({ name: keyword, page: 1 })

  const isLoading = recipesLoading || ingredientsLoading;

  return (
    <div className="p-5 md:p-12 min-h-[500px]">
      <h2 className="text-2xl font-bold mb-8 text-center">
        검색결과 "{keyword}"
      </h2>

      {isLoading ? (
        <div className="flex justify-center my-5">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-green-500 border-solid"></div>
        </div>
      ) : (
        <>
          <h3 className="text-xl font-semibold mb-3">레시피 검색 결과</h3>
          {recipesData && recipesData.recipes.length === 0 ? (
            <p className="text-lg">레시피 검색 결과가 없습니다. 😅</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recipesData && recipesData.recipes.map((recipe) => (
                <RecipeCard item={recipe} key={recipe._id} />
              ))}
            </div>
          )}

          <div className="my-5 border-t border-gray-300"></div>

          <h3 className="text-xl font-semibold mb-3">재료 검색 결과</h3>
          {ingredientsData && ingredientsData.ingredients.length === 0 ? (
            <p className="text-lg">재료 검색 결과가 없습니다. 😅</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {ingredientsData && ingredientsData.ingredients.map((ing) => (
                <IngredientCard item={ing} key={ing._id} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;