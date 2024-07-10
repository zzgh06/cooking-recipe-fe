import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipeAll from "./Recipe/RecipeAll";

const CategoryRecipePage = ({category}) => {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useSelector(state => state.recipe);

  

  console.log("category", recipes)

  return (
    <div>
\
    </div>
  );
};

export default CategoryRecipePage;
