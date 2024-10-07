import React, { useEffect, useState, Suspense, lazy, startTransition } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetchIngredients } from "../hooks/Ingredient/useFetchIngredients";
import { Box, CircularProgress, Skeleton, styled } from "@mui/material";
import { CircleRounded } from "@mui/icons-material";
import BannerComponent from "../component/Banner/BannerComponent";
import IngredientSlider from "../component/IngredientSlider/IngredientSlider";
import RecentlyViewed from "../component/RecentlyViewed/RecentlyViewed";
import mainBanner1 from "../assets/img/mainBanner1.png";
import mainBanner2 from "../assets/img/mainBanner2.png";
import { Ingredient, RecentlyViewedItem } from "../types";
import SubBanner from "../component/SubBanner/SubBanner";

const IngredientThemeCard = lazy(() =>
  import("../component/IngredientThemeCard/IngredientThemeCard")
);
const IngredientAll = lazy(() =>
  import("../component/IngredientAll/IngredientAll")
);

const BannerSkeleton = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "300px",
  backgroundColor: theme.palette.grey[200],
}));


interface RecentlyViewedIngredient {
  id: string;
  images: string;
  name: string;
}

const StorePage = () => {
  const [query] = useSearchParams();
  const name = query.get("name");
  const { data, isLoading } = useFetchIngredients({ name });
  const [recentlyViewedItems, setRecentlyViewedItems] = useState<RecentlyViewedItem[]>([]);
  const images = [
    mainBanner1,
    mainBanner2,
  ];

  useEffect(() => {
    startTransition(() => {
      const viewedItems: RecentlyViewedIngredient[] =
        JSON.parse(localStorage.getItem("viewedIngredients") || "[]");
      const convertedItems: RecentlyViewedItem[] = viewedItems.map(item => ({
        id: item.id,
        name: item.name,
        images: item.images
      }));
      setRecentlyViewedItems(convertedItems);
    });
  }, []);

  const newIngredients = data?.ingredients
    .filter((ing: Ingredient) => ing.category?.includes("신상") && ing.createdAt)
    .sort((a: Ingredient, b: Ingredient) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  const bestIngredients = data?.ingredients.filter((ing: Ingredient) => ing.totalSales > 0);
  const topDiscountedIngredients = data?.ingredients
    .filter((ing: Ingredient) => ing.discountPrice !== undefined)
    .sort((a: Ingredient, b: Ingredient) => b.discountPrice! - a.discountPrice!)
    .slice(0, 3);

  return (
    <div>
      <Suspense fallback={<BannerSkeleton />}>
        <BannerComponent images={images} />
      </Suspense>
      <IngredientSlider
        title={"베스트 상품"}
        ingredients={bestIngredients?.slice(0, 8) || []}
        loading={isLoading}
      />

      <SubBanner img={require("../assets/img/banner3.jpg")} />

      <IngredientSlider
        title={"신상품"}
        ingredients={newIngredients?.slice(0, 8) || []}
        loading={isLoading}
      />

      <Suspense fallback={<CircleRounded />}>
        <IngredientThemeCard
          ingredients={topDiscountedIngredients || []}
          loading={isLoading}
        />
      </Suspense>

      <SubBanner img={require("../assets/img/banner4.jpg")} />
      <IngredientAll />

      {recentlyViewedItems.length >= 1 && (
        <RecentlyViewed recentlyViewedItems={recentlyViewedItems} />
      )}
    </div>
  );
};

export default StorePage;
