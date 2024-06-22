import React, { useEffect, useState } from "react";
import BannerComponent from "../component/Banner/BannerComponent";
import IngredientCard from "../component/IngredientCard/IngredientCard";
import { fetchIngredients } from "../redux/ingredientSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";

const StorePage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({ page: 1, name: "" });
  const ingredientsList = useSelector((state) => state.ingredients.ingredients);
  console.log(ingredientsList);
  useEffect(() => {
    dispatch(fetchIngredients(searchQuery));
  }, []);

  const { ingredientId } = useParams();

  useEffect(() => {
    const ingredient = { id: ingredientId, name: "Product Name", image: "Product Image URL" }; // 상품 정보를 동적으로 설정
    const viewedProducts = JSON.parse(localStorage.getItem("viewedProducts")) || [];
    
    const updatedViewedProducts = viewedProducts.filter(item => item.id !== ingredientId);
    updatedViewedProducts.unshift(ingredient);
    
    localStorage.setItem("viewedProducts", JSON.stringify(updatedViewedProducts.slice(0, 2))); // 최대 5개의 최근 본 상품 저장
  }, [ingredientId]);
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
