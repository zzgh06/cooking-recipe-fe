import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RecipeCardSkeleton = () => (
  <div className="mb-2 w-full h-auto p-2 rounded-lg overflow-hidden">
    <Skeleton className="w-full h-52 rounded-lg" />
    <div className="py-2">
      <Skeleton width="60%" className="mb-1" />
      <Skeleton width="40%" />
    </div>
  </div>
);

export default RecipeCardSkeleton;
