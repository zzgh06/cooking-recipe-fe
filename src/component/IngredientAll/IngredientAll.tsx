import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import IngredientCard from "../IngredientCard/IngredientCard";
import { Grid, Typography, Container } from "@mui/material";
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
    <Container sx={{ p: 3 }}>
      <Typography
        variant="h4"
        fontWeight="600"
        marginBottom="20px"
        textAlign="center"
      >
        모든 상품
      </Typography>
      <Grid container spacing={2}>
        {isLoading && Array.from(new Array(8)).map((_, index) => (
          <Grid key={index} item xs={12} md={6} lg={3}>
            <IngredientCardSkeleton />
          </Grid>
        ))}
        {ingredients.map((ing: Ingredient) => (
          <Grid item xs={12} md={6} lg={3} key={ing._id}>
            <IngredientCard item={ing} />
          </Grid>
        ))}
      </Grid>
      {isError && <Typography>Error: {error.message}</Typography>}
      {isFetchingMore && (
        <Grid container spacing={2}>
          {Array.from(new Array(4)).map((_, index) => (
            <Grid key={index} item xs={12} md={6} lg={3}>
              <IngredientCardSkeleton />
            </Grid>
          ))}
        </Grid>
      )}
      <div ref={loadMoreTriggerRef} style={{ height: "1px" }} />
    </Container>
  );
};

export default IngredientAll;