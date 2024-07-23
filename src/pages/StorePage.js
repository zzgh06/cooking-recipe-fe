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
import banner3 from "../assets/img/banner3.jpg";
import banner4 from "../assets/img/banner4.jpg";
import MainBanner1 from "../assets/img/mainBanner1.png";
import MainBanner2 from "../assets/img/mainBanner2.png";
import MainBanner3 from "../assets/img/mainBanner3.jpg";

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
  const images = [MainBanner1, MainBanner2, MainBanner3];

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
        <SubBanner img={banner3} />
      )}
      <IngredientSlider
        title={"신상품"}
        ingredients={newIngredients.slice(0, 8)}
        loading={loading}
      />
      <Box>
        <IngredientThemeCard
          ingredients={topDiscountedIngredients}
          loading={loading}
        />
      </Box>
      {loading ? (
        <SubBannerSkeleton>
          <Skeleton variant="rectangular" width="100%" height={130} />
        </SubBannerSkeleton>
      ) : (
        <SubBanner img={banner4} />
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
