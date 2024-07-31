import React, { useEffect, useState, Suspense, lazy } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetchIngredients } from "../hooks/Ingredient/useFetchIngredients";
import { Box, Skeleton, styled } from "@mui/material";
import { CircleRounded } from "@mui/icons-material";
import BannerComponent from "../component/Banner/BannerComponent";
import IngredientSlider from "../component/IngredientSlider/IngredientSlider";
import RecentlyViewed from "../component/RecentlyViewed/RecentlyViewed";

const SubBanner = lazy(() => import("../component/SubBanner/SubBanner"));
const IngredientThemeCard = lazy(() =>
  import("../component/IngredientThemeCard/IngredientThemeCard")
);
const IngredientAll = lazy(() =>
  import("../component/IngredientAll/IngredientAll")
);

const SubBannerSkeleton = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  padding: "0 200px",
  [theme.breakpoints.down("md")]: {
    padding: "0 50px",
  },
}));

const StorePage = () => {
  const images = [
    require("../assets/img/mainBanner1.png"),
    require("../assets/img/mainBanner2.png"),
    require("../assets/img/mainBanner3.jpg"),
  ];
  const [query] = useSearchParams();
  const name = query.get("name");
  const { data, isLoading } = useFetchIngredients({ name });
  const [recentlyViewedItems, setRecentlyViewedItems] = useState([]);

  useEffect(() => {
    const viewedItems =
      JSON.parse(localStorage.getItem("viewedIngredients")) || [];
    setRecentlyViewedItems(viewedItems);
  }, []);

  const newIngredients = data?.ingredients.filter((ing) =>
    ing.category.includes("신상")
  );

  const bestIngredients = data?.ingredients.filter((ing) => ing.totalSales > 0);
  const topDiscountedIngredients = data?.ingredients
    .filter((ing) => ing.discountPrice !== undefined)
    .sort((a, b) => b.discountPrice - a.discountPrice)
    .slice(0, 3);

  return (
    <div>
      <BannerComponent images={images} />
      <IngredientSlider
        title={"베스트 상품"}
        ingredients={bestIngredients?.slice(0, 8)}
        loading={isLoading}
      />
      <Suspense
        fallback={
          <SubBannerSkeleton>
            <Skeleton variant="rectangular" width="100%" height={130} />
          </SubBannerSkeleton>
        }
      >
        <SubBanner img={require("../assets/img/banner3.jpg")} />
      </Suspense>
      <IngredientSlider
        title={"신상품"}
        ingredients={newIngredients?.slice(0, 8)}
        loading={isLoading}
      />
      <Suspense fallback={<CircleRounded />}>
        <IngredientThemeCard
          ingredients={topDiscountedIngredients}
          loading={isLoading}
        />
      </Suspense>
      <Suspense
        fallback={
          <SubBannerSkeleton>
            <Skeleton variant="rectangular" width="100%" height={130} />
          </SubBannerSkeleton>
        }
      >
        <SubBanner img={require("../assets/img/banner4.jpg")} />
      </Suspense>
      <IngredientAll />
      {recentlyViewedItems.length >= 1 && (
        <RecentlyViewed recentlyViewedItems={recentlyViewedItems} />
      )}
    </div>
  );
};

export default StorePage;
