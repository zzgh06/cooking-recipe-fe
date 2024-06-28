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
  console.log("RecipePage recipes", recipes)
  const popularRecipes = recipes.filter(recipe => recipe.reviewCnt > 0);

  console.log("RecipePage popularRecipes", popularRecipes);
  const asianCuisineRecipes = recipes.filter(recipe =>
    ["한식", "중식", "일식"].includes(recipe.categories.etc)
  );



  const subImages = [
    "https://product-image.kurly.com/hdims/resize/%3E1050x%3E140/quality/85/src/banner/random-band/pc/img/8d074afe-a6b2-4eba-a0a7-a3f1839c78e9.jpg",
    "https://product-image.kurly.com/hdims/resize/%3E1050x%3E140/quality/85/src/banner/random-band/pc/img/e433cdf3-36c6-463e-8b2a-42ffcc65507b.jpg"
  ];

  return (
    <div>
      {/* <BannerComponent images={} /> */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <RecipeSlider title={"베스트 레시피"} recipes={popularRecipes} />
      <SubBanner img={subImages[0]} />
      <RecipeSlider title={"한식 중식 일식 레시피"} recipes={asianCuisineRecipes} />
      <SubBanner img={subImages[1]} />
      <RecipeAll />
    </div>
  );
};

export default RecipePage;
