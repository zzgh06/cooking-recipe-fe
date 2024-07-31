import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import IngredientCard from "../IngredientCard/IngredientCard";
import { Box, Grid, Button, Typography, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import IngredientCardSkeleton from "../Skeleton/IngredientCardSkeleton";
import { useFetchIngredients } from "../../hooks/Ingredient/useFetchIngredients";

const LoadMoreButton = styled(Button)(({ theme }) => ({
  border: "1px solid #ddd",
  borderRadius: "8px",
  background: "linear-gradient(90deg, #4a9c75, #0095b3)",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  border: "none",
  color: "white",
  width: "250px",
  fontSize: "16px",
  padding: "10px 20px",
  borderRadius: "30px",
  "&:hover": {
    background: "linear-gradient(90deg, #00b35f, #0095b3)",
    boxShadow: "0 6px 20px rgba(0, 255, 221, 0.5)",
  },
  "&:focus": {
    outline: "none",
  },
}));

const IngredientAll = () => {
  const [searchParams] = useSearchParams();
  const [displayCount, setDisplayCount] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const searchQuery = {
    name: searchParams.get("name") || "",
    category: searchParams.get("category") || "",
  };

  const { data, isLoading, isError, error } =
    useFetchIngredients(searchQuery);

  useEffect(() => {
    setCurrentPage(1);
    setDisplayCount(8);
    setHasMore(true);
  }, [searchParams]);

  useEffect(() => {
    if (data) {
      setHasMore(data?.ingredients.length > displayCount || currentPage < data?.totalPages);
    }
  }, [data, currentPage]);

  const loadMore = () => {
    const nextPage = currentPage + 1;
    if (data?.ingredients && displayCount < data?.ingredients.length) {
      setDisplayCount(displayCount + 4);
    } else if (data && currentPage < data.totalPages) {
      setCurrentPage(nextPage);
    } else {
      setHasMore(false);
    }
  };

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
        {isLoading
          ? Array.from(new Array(8)).map((_, index) => (
              <Grid key={index} item xs={12} md={6} lg={3}>
                <IngredientCardSkeleton />
              </Grid>
            ))
          : data?.ingredients.slice(0, displayCount).map((ing) => (
              <Grid item xs={12} md={6} lg={3} key={ing._id}>
                <IngredientCard item={ing} />
              </Grid>
            ))}
      </Grid>
      {isError && <Typography>Error: {error.message}</Typography>}
      {hasMore && !isLoading && (
        <Box sx={{ textAlign: "center", my: 3 }}>
          <LoadMoreButton onClick={loadMore}>더보기</LoadMoreButton>
        </Box>
      )}
    </Container>
  );
};

export default IngredientAll;