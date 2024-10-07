import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import IngredientCard from "../IngredientCard/IngredientCard";
import IngredientCardSkeleton from "../Skeleton/IngredientCardSkeleton";
import { useFetchIngredients } from "../../hooks/Ingredient/useFetchIngredients";
import { Ingredient } from "../../types";

const IngredientAll = () => {
  const [searchParams] = useSearchParams();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreTriggerRef = useRef<HTMLDivElement | null>(null);

  const searchQuery = {
    name: searchParams.get("name") || "",
    category: searchParams.get("category") || "",
    page: currentPage,
  };

  const { data, isLoading, isError, error } = useFetchIngredients(searchQuery);

  useEffect(() => {
    setIngredients([]);
    setCurrentPage(1);
    setHasMore(true);
  }, [searchParams]);

  useEffect(() => {
    if (data) {
      const delay = 1000;
      setTimeout(() => {
        setIngredients((prev) => [...prev, ...data.ingredients]);
        setHasMore(currentPage < data.totalPages);
        setIsFetchingMore(false);
      }, delay);
    }
  }, [data, currentPage]);

  const loadMore = useCallback(() => {
    if (hasMore && !isLoading && !isFetchingMore) {
      setIsFetchingMore(true);
      setCurrentPage((prev) => prev + 1);
    }
  }, [hasMore, isLoading, isFetchingMore]);

  useEffect(() => {
    if (!loadMoreTriggerRef.current || !hasMore) return;

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    }, { threshold: 0.8 });

    observerRef.current.observe(loadMoreTriggerRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [loadMore, hasMore]);

  return (
    <div className="p-3">
      <h4 className="font-semibold mb-5 text-center text-[35px]">
        모든 상품
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-[70px] md:px-[100px]">
        {isLoading && Array.from(new Array(8)).map((_, index) => (
          <div key={index} className="w-full">
            <IngredientCardSkeleton />
          </div>
        ))}
        {ingredients.map((ing: Ingredient) => (
          <div className="w-full" key={ing._id}>
            <IngredientCard item={ing} />
          </div>
        ))}
      </div>
      {isError && <p>Error: {error.message}</p>}
      {isFetchingMore && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-[70px] md:px-[100px]">
          {Array.from(new Array(4)).map((_, index) => (
            <div key={index} className="w-full">
              <IngredientCardSkeleton />
            </div>
          ))}
        </div>
      )}
      <div ref={loadMoreTriggerRef} style={{ height: "1px" }} />
    </div>
  );
};

export default IngredientAll;