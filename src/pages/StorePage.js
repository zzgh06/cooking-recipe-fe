import React, { useEffect, useState } from "react";
import BannerComponent from "../component/Banner/BannerComponent";
import IngredientCard from "../component/IngredientCard/IngredientCard";
import { fetchIngredients } from "../redux/ingredientSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";

const StorePage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({ page: 2, name: "" });
  const ingredientsList = useSelector((state) => state.ingredients.ingredients);
  console.log(ingredientsList);
  useEffect(() => {
    dispatch(fetchIngredients(searchQuery));
  }, []);
  
  return (
    <div>
      <BannerComponent />
      StorePage
      {ingredientsList.map((item) => (
        <IngredientCard item={item} />
      ))}
    </div>
  );
};

export default StorePage;
