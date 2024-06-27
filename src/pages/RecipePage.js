import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../redux/recipeSlice";
import BannerComponent from "../component/Banner/BannerComponent";
import RecipeSlider from "../component/RecipeSlider/RecipeSlider";
import "../style/RecipePage.style.css";
import SubBanner from "../component/SubBanner/SubBanner";
import RecipeAll from "../component/RecipeAll/RecipeAll";

const RecipePage = () => {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useSelector(state => state.recipe);

  useEffect(() => {
    const searchQuery = {
      name: "", // 검색어를 추가할 수 있습니다.
      page: 1 // 페이지 번호를 추가할 수 있습니다.
    };
    dispatch(fetchRecipes(searchQuery));
  }, [dispatch]);

  console.log("recipes", recipes);

  const images = [
    "https://product-image.kurly.com/hdims/resize/%3E1050x%3E140/quality/85/src/banner/random-band/pc/img/8d074afe-a6b2-4eba-a0a7-a3f1839c78e9.jpg",
    "https://product-image.kurly.com/hdims/resize/%3E1050x%3E140/quality/85/src/banner/random-band/pc/img/e433cdf3-36c6-463e-8b2a-42ffcc65507b.jpg"
  ];

  return (
    <div>
      <BannerComponent />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <RecipeSlider title={"인기 레시피"} recipes={recipes} />
      <SubBanner img={images[0]} />
      <RecipeSlider title={"신규 레시피"} recipes={recipes} />
      <SubBanner img={images[1]} />
      <RecipeAll />
    </div>
  );
};

export default RecipePage;
