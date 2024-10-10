import React, { useEffect, useState } from "react";
import { useFetchRecipesByCategory } from "../../hooks/Recipe/useFetchRecipesByCategory";
import RecipeCard from "../RecipeCard/RecipeCard";
import RecipeCardSkeleton from "../Skeleton/RecipeCardSkeleton";
import { Recipe } from "../../types";
import Pagination from "react-js-pagination";

interface RecipeAllProps {
  category: string;
}

const paginationStyle = `
  .pagination {
    display: flex;
    justify-content: center;
    gap: 4px;
  }
  
  .pagination li {
    display: inline-block;
  }
  
  .pagination li a {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 2.5rem;
    height: 2.5rem;
    padding: 0 0.5rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #4b5563;
    transition: all 0.2s;
  }
  
  .pagination li.active a {
    background-color: #2563eb;
    color: white;
  }
  
  .pagination li a:hover:not(.active) {
    background-color: #f3f4f6;
  }
  
  .pagination li.disabled a {
    color: #9ca3af;
    cursor: not-allowed;
  }
`;

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
      <style>{paginationStyle}</style>
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
          <div className="mt-8">
            <Pagination
              activePage={page}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={totalPages * itemsPerPage}
              pageRangeDisplayed={5}
              prevPageText="이전"
              nextPageText="다음"
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default RecipeAll;