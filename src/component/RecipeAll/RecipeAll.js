import React from "react";
import "../../style/RecipeAll.style.css";
import Category from "../Category/Category";

const RecipeAll = () => {
  return (
    <div className="recipe-all-container">
      <div className="recipe-all-title">
        <h2>모든 레시피</h2>
        <p>What’s in your fridge의 모든 레시피를 만나보세요</p>
      </div>
      <div className="recipe-category">
        <Category />
      </div>
    </div>
  );
};

export default RecipeAll;
