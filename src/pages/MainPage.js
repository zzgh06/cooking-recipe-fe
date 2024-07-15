import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../redux/recipeSlice';
import RecipeSlider from '../component/RecipeSlider/RecipeSlider';
import SubBanner from '../component/SubBanner/SubBanner';
import { Container } from '@mui/material';


const MainPage = () => {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useSelector((state) => state.recipe);

  useEffect(() => {
    const searchQuery = { name: "" };
    dispatch(fetchRecipes(searchQuery));
  }, [dispatch]);

  const popularRecipes = recipes.filter((recipe) => recipe.reviewCnt > 0);

  const newRecipes = recipes.slice(0, 8);
  const subImages = [
    "https://product-image.kurly.com/hdims/resize/%3E1050x%3E140/quality/85/src/banner/random-band/pc/img/8d074afe-a6b2-4eba-a0a7-a3f1839c78e9.jpg",
    "https://product-image.kurly.com/hdims/resize/%3E1050x%3E140/quality/85/src/banner/random-band/pc/img/e433cdf3-36c6-463e-8b2a-42ffcc65507b.jpg",
  ];

  return (
    <Container>
      <RecipeSlider title={"베스트 레시피"} recipes={popularRecipes} />
      <SubBanner img={subImages[0]} />
      <RecipeSlider
        title={"최신 레시피"}
        recipes={newRecipes}
      />
      <SubBanner img={subImages[1]} />
    </Container>
  )
}

export default MainPage