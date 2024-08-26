import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import RecipeSlider from "../component/RecipeSlider/RecipeSlider";
import RecommendRecipe from "../component/RecommendRecipe/RecommendRecipe";
import { Box, Skeleton, styled } from "@mui/material";
import banner1 from "../assets/img/banner1.webp";
import banner2 from "../assets/img/banner2.webp";
import { useFetchRecipes } from "../hooks/Recipe/useFetchRecipes";

const SubBanner = React.lazy(() => import("../component/SubBanner/SubBanner"));

const SubBannerSkeleton = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  padding: "0 200px",
  [theme.breakpoints.down("md")]: {
    padding: "0 100px",
  },
}));

const preloadImage = (url) => {
  const img = new Image();
  img.src = url;
};

const MainPage = () => {
  const dispatch = useDispatch();
  const searchQuery = { name: "" };
  const { data, isLoading } = useFetchRecipes(searchQuery);

  useEffect(() => {
    preloadImage(banner1);
    preloadImage(banner2);
  }, [dispatch]);

  const recipes = data?.recipes || [];
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
        loading={isLoading}
      />

      <RecipeSlider
        title={"최신 레시피"}
        recipes={newRecipes}
        loading={isLoading}
      />
      <Suspense
        fallback={
          <SubBannerSkeleton>
            <Skeleton variant="rectangular" width="100%" height={130} />
          </SubBannerSkeleton>
        }
      >
        <SubBanner img={banner2} />
      </Suspense>

      <RecommendRecipe recommendRecipes={recommendRecipes} />
    </>
  );
};

export default MainPage;
