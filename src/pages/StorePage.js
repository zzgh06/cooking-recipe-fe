import React, { useEffect, useState } from "react";
import BannerComponent from "../component/Banner/BannerComponent";
import IngredientCard from "../component/IngredientCard/IngredientCard";
import { fetchIngredients } from "../redux/ingredientSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import IngredientSlider from "../component/IngredientSlider/IngredientSlider";
import SubBanner from "../component/SubBanner/SubBanner";
import IngredientThemeCard from "../component/IngredientThemeCard/IngredientThemeCard";
import IngredientAll from "../component/IngredientAll/IngredientAll";

const StorePage = () => {
  const images = [
    "https://static.wtable.co.kr/image/production/service/banner/3669/e22ab935-5afa-45a9-8562-6e386111c0f9.png",
    "https://static.wtable.co.kr/image/production/service/banner/3645/1af3729b-6042-4036-b9bc-1424a31c3965.png",
    "https://static.wtable.co.kr/image/production/service/category/2915/dfa8032a-41a0-44ab-90e1-dde2bbf1f568.jpg"
  ];

  const subImages = [
    "https://product-image.kurly.com/hdims/resize/%3E1050x%3E140/quality/85/src/banner/random-band/pc/img/e95569ee-228d-4ba0-bbb4-9d6544f7b0dc.jpg",
    "https://product-image.kurly.com/hdims/resize/%3E1050x%3E140/quality/85/src/banner/random-band/pc/img/692d9858-1728-4f8d-8753-6262026284ac.jpg"
  ];
  const dispatch = useDispatch();
  const [query, setQuery] = useSearchParams();
  const name = query.get("name");
  const ingredientsList = useSelector((state) => state.ingredients.ingredients);
  console.log(ingredientsList);
  useEffect(() => {
    dispatch(fetchIngredients({name}));
  }, [query, name]);
  
  return (
    <div>
      <BannerComponent images={images}/>
      <IngredientSlider title={"베스트 상품"} ingredientsList={ingredientsList}/>
      <SubBanner img={subImages[0]} />
      <IngredientSlider title={"신상품"} ingredientsList={ingredientsList}/>
      <IngredientThemeCard ingredientsList={ingredientsList} />
      <SubBanner img={subImages[1]} />
      <IngredientAll ingredientsList={ingredientsList}/>
    </div>
  );
};

export default StorePage;
