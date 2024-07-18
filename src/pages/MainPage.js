import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../redux/recipeSlice";
import RecipeSlider from "../component/RecipeSlider/RecipeSlider";
import SubBanner from "../component/SubBanner/SubBanner";
import { Box, Skeleton, styled } from "@mui/material";
import RecommendRecipe from "../component/RecommendRecipe/RecommendRecipe";

const SubBannerSkeleton = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  padding: "0 200px",
  [theme.breakpoints.down("md")]: {
    padding: "0 50px",
  },
}));

const MainPage = () => {
  const dispatch = useDispatch();
  const { recipes, loading } = useSelector((state) => state.recipe);

  useEffect(() => {
    const searchQuery = { name: "" };
    dispatch(fetchRecipes(searchQuery));
  }, [dispatch]);

  const bestRecipes = [...recipes].sort((a, b) => b.viewCnt - a.viewCnt);
  const newRecipes = [...recipes].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const recommendRecipes = [...recipes].sort((a, b)=>b.reviewCnt - a.reviewCnt);

  const subImages = [
    "https://product-image.kurly.com/hdims/resize/%3E1050x%3E140/quality/85/src/banner/random-band/pc/img/8d074afe-a6b2-4eba-a0a7-a3f1839c78e9.jpg",
    "https://product-image.kurly.com/hdims/resize/%3E1050x%3E140/quality/85/src/banner/random-band/pc/img/e433cdf3-36c6-463e-8b2a-42ffcc65507b.jpg",
  ];

  return (
    <>
      <RecipeSlider
        title={"베스트 레시피"}
        recipes={bestRecipes}
        loading={loading}
      />
      {loading ? (
        <SubBannerSkeleton>
          <Skeleton variant="rectangular" width="100%" height={130} />
        </SubBannerSkeleton>
      ) : (
        <SubBanner img={subImages[0]} />
      )}
      <RecipeSlider
        title={"최신 레시피"}
        recipes={newRecipes}
        loading={loading}
      />
      {loading ? (
        <SubBannerSkeleton>
          <Skeleton variant="rectangular" width="100%" height={130} />
        </SubBannerSkeleton>
      ) : (
        <SubBanner img={subImages[1]} />
      )}
      <RecommendRecipe recommendRecipes={recommendRecipes} />
    </>
  );
};

export default MainPage;
