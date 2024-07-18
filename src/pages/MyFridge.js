import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchIngredients,
  setSelectedIngredients,
} from "../redux/ingredientSlice";
import MyFridgeSearchResults from "../component/MyFridgeSearchResults/MyFridgeSearchResults";
import SearchResultCard from "../component/SearchResultCard/SearchResultCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  fetchFridgeItems,
  fetchRecommendedRecipes,
  fridgeIngredientRecipeResult,
} from "../redux/fridgeSlice";
import FridgeItemCard from "../component/FridgeItemCard/FridgeItemCard";
import SearchBox from "../component/SearchBox/SearchBox";
import RecentlyViewed from "../component/RecentlyViewed/RecentlyViewed";
import {
  CircularProgress,
  Box,
  Button,
  Typography,
  Grid,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const FridgeContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  marginBottom: "20px",
  borderRadius: "10px",
  boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
  minWidth: "500px",
  minHeight: "400px",
  border: "2px solid lightgrey",
  [theme.breakpoints.down("sm")]: {
    minWidth: "100%",
    padding: "10px",
    marginBottom: "10px",
  },
}));

const GridContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  alignItems: "start",
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

const MyFridge = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingredient = useSelector(
    (state) => state.ingredients.ingredients || []
  );
  const { fridgeItems, recipeList, loading, recipeLoading } = useSelector(
    (state) => state.fridge || []
  );

  const selectedIngredients = useSelector(
    (state) => state.ingredients.selectedIngredients
  );
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    name: query.get("name") || "",
  });
  const [hasSearched, setHasSearched] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [recentlyViewedItems, setRecentlyViewedItems] = useState([]);
  const [recommendClicked, setRecommendClicked] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const viewedItems =
      JSON.parse(localStorage.getItem("viewedIngredients")) || [];
    setRecentlyViewedItems(viewedItems);
  }, []);

  useEffect(() => {
    if (searchQuery.name) {
      dispatch(fetchIngredients(searchQuery));
      dispatch(fridgeIngredientRecipeResult(searchQuery));
      setHasSearched(true);
      setRecommendClicked(false);
    } else {
      dispatch(setSelectedIngredients([]));
      setHasSearched(false);
    }
  }, [dispatch, searchQuery]);

  useEffect(() => {
    dispatch(fetchFridgeItems());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setSelectedIngredients([]));
    };
  }, [dispatch]);

  const handleSearchChange = (e) => {
    const newSearchQuery = { ...searchQuery, name: e.target.value };
    setSearchQuery(newSearchQuery);
    if (e.target.value) {
      setQuery({ name: e.target.value });
    } else {
      navigate("/fridge");
      setHasSearched(false);
    }
  };

  const handleCheckboxChange = (name) => {
    setCheckedItems((prev) => {
      const newCheckedItems = new Set(prev);
      if (newCheckedItems.has(name)) {
        newCheckedItems.delete(name);
      } else {
        newCheckedItems.add(name);
      }
      return newCheckedItems;
    });
  };

  const handleRecommendRecipes = () => {
    if (checkedItems.size > 0) {
      const selectedIngredients = Array.from(checkedItems);
      dispatch(fetchRecommendedRecipes(selectedIngredients));
      setRecommendClicked(true);
      setHasSearched(false);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setRecommendClicked(false);
  };

  return (
    <Box sx={{ padding: { xs: "20px", md: "30px 150px" } }}>
      <Box sx={{ textAlign: "center", marginBottom: "40px" }}>
        <Typography variant="h4" gutterBottom>
          My 냉장고
        </Typography>
        <Typography variant="subtitle1">
          나만의 냉장고에 재료를 추가하고 최적의 레시피를 추천해드려요
        </Typography>
      </Box>

      <GridContainer>
        <FridgeContainer>
          {fridgeItems.length === 0 ? (
            <Typography variant="h6">
              냉장고가 텅 비워져 있습니다 😅 <br />
              My 냉장고를 가득 채워주세요.
            </Typography>
          ) : (
            <>
              <Grid
                container
                spacing={2}
                sx={{
                  alignContent: "flex-start",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                {fridgeItems.map((item) => (
                  <Grid item key={item.ingredientId._id}>
                    <FridgeItemCard
                      item={item.ingredientId}
                      id={item._id}
                      isChecked={checkedItems.has(item.ingredientId.name)}
                      onCheckboxChange={() =>
                        handleCheckboxChange(item.ingredientId.name)
                      }
                    />
                  </Grid>
                ))}
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleRecommendRecipes}
                  sx={{ width: { xs: "100%", sm: "350px" } }}
                >
                  레시피 추천
                </Button>
              </Box>
            </>
          )}
        </FridgeContainer>

        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              padding: { xs: "0 20px", sm: "0 50px" },
              marginBottom: "40px",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "600", marginBottom: "20px" }}
            >
              원하시는 식재료를 검색해주세요
            </Typography>
            <SearchBox
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onCheckEnter={handleSearchChange}
              selectedIngredients={selectedIngredients}
              placeholder="냉장고 속 재료 검색"
              field="name"
              page="fridge"
            />
          </Box>

          {hasSearched && (
            <Box
              sx={{
                textAlign: "center",
                padding: "20px 0",
                borderTop: "1px solid lightgrey",
                borderBottom: "1px solid lightgrey",
                marginBottom: "40px",
              }}
            >
              {loading ? (
                <CircularProgress />
              ) : ingredient.length === 0 ? (
                <Typography>일치하는 재료가 없습니다.</Typography>
              ) : (
                ingredient.map((item) => (
                  <SearchResultCard key={item._id} item={item} />
                ))
              )}
            </Box>
          )}

          <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle variant="h4" sx={{ textAlign: "center" }}>
              추천 레시피
            </DialogTitle>
            <DialogContent>
              {recipeLoading ? (
                <CircularProgress />
              ) : (
                <MyFridgeSearchResults recipeList={recipeList} />
              )}
            </DialogContent>
            <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                onClick={handleClose}
                color="primary"
                sx={{ width: "400px" }}
              >
                닫기
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </GridContainer>

      {recentlyViewedItems.length >= 1 && (
        <RecentlyViewed recentlyViewedItems={recentlyViewedItems} />
      )}
    </Box>
  );
};

export default MyFridge;
