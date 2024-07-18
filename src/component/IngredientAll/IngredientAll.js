import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import IngredientCard from "../IngredientCard/IngredientCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../../redux/ingredientSlice";
import { Box, Grid, Button, CircularProgress, Typography, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import IngredientCardSkeleton from "../Skeleton/IngredientCardSkeleton";

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
  const dispatch = useDispatch();
  const { ingredients, totalPages, loading, error } = useSelector(
    (state) => state.ingredients
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [displayCount, setDisplayCount] = useState(8);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const name = searchParams.get("name") || "";
    setCurrentPage(1);
    setDisplayCount(8);
    dispatch(fetchIngredients({ name }));
  }, [dispatch, searchParams]);

  const loadMore = async () => {
    if (displayCount < ingredients.length) {
      setDisplayCount(displayCount + 4);
    } else if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      await dispatch(
        fetchIngredients({
          page: nextPage,
          name: searchParams.get("name") || "",
          category: searchParams.get("category") || "",
        })
      );
      setCurrentPage(nextPage);
    } else {
      setHasMore(false);
    }
  };

  return (
    <Container sx={{p: 3}}>
      <Typography
        variant="h4"
        fontWeight="600"
        marginBottom="20px"
        textAlign="center"
      >
        모든 상품
      </Typography>
      <Grid container spacing={2}>
        {loading
          ? Array.from(new Array(8)).map((_, index) => (
              <Grid key={index} item xs={12} md={6} lg={3}>
                <IngredientCardSkeleton />
              </Grid>
            ))
          : ingredients.slice(0, displayCount).map((ing) => (
              <Grid item xs={12} md={6} lg={3} key={ing._id}>
                <IngredientCard key={ing._id} item={ing} />
              </Grid>
            ))}
      </Grid>
      {error && <Typography>Error: {error}</Typography>}
      {hasMore && !loading && (
        <Box sx={{ textAlign: "center", my: 3 }}>
          <LoadMoreButton onClick={loadMore}>더보기</LoadMoreButton>
        </Box>
      )}
    </Container>
  );
};

export default IngredientAll;
