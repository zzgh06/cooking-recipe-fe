import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchIngredients } from "../redux/ingredientSlice";

const IngredientsDetail = () => {
  const { id } = useParams();
  const ingredientId = id;
  const dispatch = useDispatch();
  const ingredientList = useSelector(
    (state) => state.ingredients.ingredients || []
  );
  const ingredient = ingredientList.filter((item) => item?._id === id);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  const recentlyIngredient = {
    id: ingredient[0]._id,
    name: ingredient[0].name,
    image: ingredient[0].image,
  };

  useEffect(() => {
    const viewedIngredients =
      JSON.parse(localStorage.getItem("viewedIngredients")) || [];

    const updatedViewedIngredients = viewedIngredients.filter(
      (item) => item.id !== id
    );
    updatedViewedIngredients.unshift(recentlyIngredient);

    localStorage.setItem(
      "viewedIngredients",
      JSON.stringify(updatedViewedIngredients.slice(0, 2))
    );
  }, [ingredientId, recentlyIngredient]);

  return <div>Ingredients</div>;
};

export default IngredientsDetail;
