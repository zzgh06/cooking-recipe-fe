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
    dispatch(fetchRecipes());
  }, [dispatch]);

  console.log("recipes", recipes);

  const subImages = [
    "https://product-image.kurly.com/hdims/resize/%3E1050x%3E140/quality/85/src/banner/random-band/pc/img/8d074afe-a6b2-4eba-a0a7-a3f1839c78e9.jpg",
    "https://product-image.kurly.com/hdims/resize/%3E1050x%3E140/quality/85/src/banner/random-band/pc/img/e433cdf3-36c6-463e-8b2a-42ffcc65507b.jpg"
  ];

  return (
    <div>
      {/* <BannerComponent images={} /> */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <RecipeSlider title={"인기 레시피"} recipes={recipes} />
      <SubBanner img={subImages[0]} />
      <RecipeSlider title={"신규 레시피"} recipes={recipes} />
      <SubBanner img={subImages[1]} />
      <RecipeAll />
    </div>
  );
};

export default RecipePage;
