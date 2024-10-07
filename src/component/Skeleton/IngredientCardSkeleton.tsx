import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const IngredientCardSkeleton = () => (
  <div className="flex flex-col bg-white shadow rounded-lg p-4 mb-4">
    <Skeleton height={315} className="rounded-lg" />
    <div className="mt-4">
      <Skeleton height={24} width="60%" className="mb-2" />
      <Skeleton height={24} width="40%" />
    </div>
  </div>
);

export default IngredientCardSkeleton;