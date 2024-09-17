import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setSelectedIngredients } from "../redux/ingredientSlice";
import MyFridgeSearchResults from "../component/MyFridgeSearchResults/MyFridgeSearchResults";
import SearchResultCard from "../component/SearchResultCard/SearchResultCard";
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
import { useFetchIngredients } from "../hooks/Ingredient/useFetchIngredients";
import { useFetchFridgeItems } from "../hooks/Fridge/useFetchFridgeItems";
import { useFetchRecommendedRecipes } from "../hooks/Fridge/useFetchRecommendedRecipes";
import { setToastMessage } from "../redux/commonUISlice";
import { RootState } from "../redux/store";
import { FridgeItem, Ingredient, RecentlyViewedItem, SearchQuery } from "../types";

const FridgeContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "10px",
  boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
  border: "2px solid lightgrey",
  [theme.breakpoints.up("md")]: {
    minWidth: "500px",
    minHeight: "400px",
    padding: "20px",
    marginBottom: "20px",
  },
}));

const GridContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "10px",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
}));

interface RecentlyViewedIngredient {
  id : string;
  images: string;
  name: string;
}

const MyFridge = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedIngredients = useSelector(
    (state: RootState) => state.ingredients.selectedIngredients || []
  );
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    page: Number(query.get("page")) || 1,
    name: query.get("name") || "",
  });
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: ingredientData, isLoading } = useFetchIngredients(searchQuery);
  const { data: fridgeData, refetch } = useFetchFridgeItems(query);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [recentlyViewedItems, setRecentlyViewedItems] = useState<RecentlyViewedItem[]>([]);
  const [recommendClicked, setRecommendClicked] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const {
    data: recipeList,
    isLoading: recipeLoading,
    refetch: refetchRecipes,
  } = useFetchRecommendedRecipes(Array.from(checkedItems));

  useEffect(() => {
    refetch();
  }, [query, refetch]);

  useEffect(() => {
    const viewedItems: RecentlyViewedIngredient[] =
      JSON.parse(localStorage.getItem("viewedIngredients") || "[]");

    const convertedItems: RecentlyViewedItem[] = viewedItems.map(item => ({
      id: item.id,
      name: item.name,
      images: item.images
    }));

    setRecentlyViewedItems(convertedItems);
  }, []);

  useEffect(() => {
    if (searchQuery.name) {
      setHasSearched(true);
      setRecommendClicked(false);
    } else {
      setHasSearched(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    return () => {
      dispatch(setSelectedIngredients([]));
    };
  }, [dispatch]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user) {
      dispatch(
        setToastMessage({
          message: "로그인이 필요한 서비스 입니다.",
          status: "error",
        })
      );
      navigate("/login");
    }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = { ...searchQuery, name: e.target.value };
    setSearchQuery(newSearchQuery);
    if (e.target.value) {
      setQuery({ name: e.target.value });
    } else {
      navigate("/fridge");
      setHasSearched(false);
    }
  };

  const handleCheckboxChange = (name: string) => {
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
      setRecommendClicked(true);
      setHasSearched(false);
      refetchRecipes();
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setRecommendClicked(false);
  };

  return (
    <Box sx={{ padding: { xs: "20px", sm: "30px", md: "50px 150px" } }}>
      <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
        <Typography variant="h4" gutterBottom>
          My 냉장고
        </Typography>
        <Typography variant="subtitle1">
          나만의 냉장고에 재료를 추가하고 최적의 레시피를 추천해드려요
        </Typography>
      </Box>

      <GridContainer>
        <FridgeContainer>
          {fridgeData?.length === 0 ? (
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
                  marginBottom: "10px",
                }}
              >
                {fridgeData?.map((item: FridgeItem) => (
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
                  sx={{ width: { xs: "100%", sm: "300px" } }}
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
              padding: { xs: "0 10px", sm: "0 20px", md: "0 50px" },
              marginBottom: "20px",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "600",
                marginBottom: "10px",
                minWidth: "350px",
              }}
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
                padding: "10px 0",
                borderTop: "1px solid lightgrey",
                borderBottom: "1px solid lightgrey",
                marginBottom: "20px",
              }}
            >
              {isLoading ? (
                <CircularProgress size="60px" sx={{ color: "green" }} />
              ) : ingredientData?.ingredients.length === 0 ? (
                <Box sx={{padding: "50px 90px", boxShadow: 1, borderRadius: 2}}>
                  <Typography variant="h5" fontSize="20px">일치하는 재료가 없습니다. 😅</Typography>
                </Box>
              ) : (
                ingredientData?.ingredients.map((item: Ingredient) => (
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
                <CircularProgress size="60px" sx={{ color: "green" }} />
              ) : (
                <MyFridgeSearchResults recipeList={recipeList} />
              )}
            </DialogContent>
            <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                onClick={handleClose}
                color="primary"
                sx={{ width: { xs: "100%", sm: "300px" } }}
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
