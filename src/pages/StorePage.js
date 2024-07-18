import React, { useEffect, useState } from "react";
import BannerComponent from "../component/Banner/BannerComponent";
import { fetchIngredients } from "../redux/ingredientSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import IngredientSlider from "../component/IngredientSlider/IngredientSlider";
import SubBanner from "../component/SubBanner/SubBanner";
import IngredientThemeCard from "../component/IngredientThemeCard/IngredientThemeCard";
import IngredientAll from "../component/IngredientAll/IngredientAll";
import RecentlyViewed from "../component/RecentlyViewed/RecentlyViewed";
import { Box, Skeleton, styled } from "@mui/material";

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
    "https://static.wtable.co.kr/image/production/service/banner/3669/e22ab935-5afa-45a9-8562-6e386111c0f9.png",
    "https://static.wtable.co.kr/image/production/service/banner/3645/1af3729b-6042-4036-b9bc-1424a31c3965.png",
    "https://static.wtable.co.kr/image/production/service/category/2915/dfa8032a-41a0-44ab-90e1-dde2bbf1f568.jpg",
  ];

  const subImages = [
    "https://product-image.kurly.com/hdims/resize/%3E1050x%3E140/quality/85/src/banner/random-band/pc/img/e95569ee-228d-4ba0-bbb4-9d6544f7b0dc.jpg",
    "https://product-image.kurly.com/hdims/resize/%3E1050x%3E140/quality/85/src/banner/random-band/pc/img/692d9858-1728-4f8d-8753-6262026284ac.jpg",
  ];
  const dispatch = useDispatch();
  const [query, setQuery] = useSearchParams();
  const name = query.get("name");
  const { ingredients, loading } = useSelector(
    (state) => state.ingredients || []
  );

  const [recentlyViewedItems, setRecentlyViewedItems] = useState([]);
  useEffect(() => {
    const viewedItems =
      JSON.parse(localStorage.getItem("viewedIngredients")) || [];
    setRecentlyViewedItems(viewedItems);
  }, []);

  const newIngredients = ingredients.filter((ing) =>
    ing.category.includes("신상")
  );

  const bestIngredients = ingredients.filter((ing) => ing.totalSales > 0);
  const topDiscountedIngredients = ingredients
    .filter((ing) => ing.discountPrice !== undefined)
    .sort((a, b) => b.discountPrice - a.discountPrice)
    .slice(0, 3);

  useEffect(() => {
    dispatch(fetchIngredients({ name }));
  }, [query, name]);

  return (
    <div>
      <BannerComponent images={images} />
      <IngredientSlider
        title={"베스트 상품"}
        ingredients={bestIngredients.slice(0, 8)}
        loading={loading}
      />
      {loading ? (
        <SubBannerSkeleton>
          <Skeleton variant="rectangular" width="100%" height={130} />
        </SubBannerSkeleton>
      ) : (
        <SubBanner img={subImages[0]} />
      )}
      <IngredientSlider
        title={"신상품"}
        ingredients={newIngredients.slice(0, 8)}
        loading={loading}
      />
      <Box>
        <IngredientThemeCard ingredients={topDiscountedIngredients} loading={loading} />
      </Box>
      {loading ? (
        <SubBannerSkeleton>
          <Skeleton variant="rectangular" width="100%" height={130} />
        </SubBannerSkeleton>
      ) : (
        <SubBanner img={subImages[1]} />
      )}
      <IngredientAll />
      {recentlyViewedItems.length >= 1 ? (
        <RecentlyViewed recentlyViewedItems={recentlyViewedItems} />
      ) : (
        ""
      )}
    </div>
  );
};

export default StorePage;
