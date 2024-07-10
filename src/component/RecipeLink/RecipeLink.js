import React from "react";
import { Link } from "react-router-dom";

const RecipeLink = ({ category, children }) => {
  const url = category ? `/recipes/${encodeURIComponent(category)}` : "/recipes/all";
  
  return (
    <Link to={url}>
      {children}
    </Link>
  );
};

export default RecipeLink;
