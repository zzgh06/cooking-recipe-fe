import React, { useEffect, useState } from "react";
import { useFetchRecipesByCategory } from "../../hooks/Recipe/useFetchRecipesByCategory";
import RecipeCard from "../RecipeCard/RecipeCard";
import RecipeCardSkeleton from "../Skeleton/RecipeCardSkeleton";
import { Recipe } from "../../types";
import PaginationComponent from "../Pagination/PaginationComponent";

interface RecipeAllProps {
  category: string;
}

const RecipeAll = ({ category }: RecipeAllProps) => {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, refetch } = useFetchRecipesByCategory({
    etc: category,
    page: page.toString(),
  });

  useEffect(() => {
    refetch();
  }, [category, page, refetch]);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const recipes: Recipe[] = data?.recipeList || [];
  const totalPages: number = data?.totalPages || 0;
  const itemsPerPage: number = 1;

  return (
    <>
      <div className="container mx-auto px-10 flex flex-col items-center my-8">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isLoading
            ? Array.from(new Array(8)).map((_, index) => (
              <div key={index}>
                <RecipeCardSkeleton />
              </div>
            ))
            : recipes.length > 0 ? (
              recipes.map((recipe) => (
                <div key={recipe._id}>
                  <RecipeCard item={recipe} />
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic mt-5">작성한 레시피가 없습니다.</p>
            )}
        </div>

        {totalPages > 1 && (
          <PaginationComponent
            activePage={page}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={totalPages * itemsPerPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
};

export default RecipeAll;