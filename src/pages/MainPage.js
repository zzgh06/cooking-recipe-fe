import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../redux/recipeSlice";
import RecipeSlider from "../component/RecipeSlider/RecipeSlider";
import SubBanner from "../component/SubBanner/SubBanner";
import { Box, Skeleton, styled } from "@mui/material";
import RecommendRecipe from "../component/RecommendRecipe/RecommendRecipe";
import banner1 from "../assets/img/banner1.jpg";
import banner2 from "../assets/img/banner2.jpg";

const SubBannerSkeleton = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  padding: "0 200px",
  [theme.breakpoints.down("md")]: {
    padding: "0 50px",
  },
}));

const preloadImage = (url) => {
  const img = new Image();
  img.src = url;
};

const MainPage = () => {
  const dispatch = useDispatch();
  const { recipes, loading } = useSelector((state) => state.recipe);

  useEffect(() => {
    const searchQuery = { name: "" };
    dispatch(fetchRecipes(searchQuery));
    preloadImage(banner1);
    preloadImage(banner2);
  }, [dispatch]);

  const bestRecipes = [...recipes]
    .sort((a, b) => b.viewCnt - a.viewCnt)
    .slice(0, 8);
  const newRecipes = [...recipes]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8);
  const recommendRecipes = [...recipes].sort(
    (a, b) => b.reviewCnt - a.reviewCnt
  );

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
        <SubBanner img={banner1} />
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
        <SubBanner img={banner2} />
      )}
      <RecommendRecipe recommendRecipes={recommendRecipes} />
    </>
  );
};

export default MainPage;
