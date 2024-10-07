import React from "react";
import IngredientCard from "../IngredientCard/IngredientCard";
import IngredientCardSkeleton from "../Skeleton/IngredientCardSkeleton";
import { Ingredient } from "../../types";

interface IngredientThemeCardProps {
  ingredients: Ingredient[];
  loading: boolean;
}

const IngredientThemeCard = ({ ingredients, loading }: IngredientThemeCardProps) => {
  return (
    <div className="container mx-auto px-[120px]">
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="lg:w-1/4">
          <h2 className="text-3xl font-semibold">📣 빅세일 추천특가</h2>
          <p className="text-lg text-gray-600">
            상반기 인기 상품 득템 찬스
          </p>
        </div>
        <div className="lg:w-3/4">
          <div className="flex overflow-x-auto gap-3">
            {loading
              ? Array.from(new Array(3)).map((_, index) => (
                  <div key={index} className="flex-none w-[275px]">
                    <IngredientCardSkeleton />
                  </div>
                ))
              : ingredients.map((ing) => (
                  <div key={ing._id} className="flex-none w-[275px]">
                    <IngredientCard item={ing} />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientThemeCard;