import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Recipe } from "../../types";
import RecipeSkeleton from "../Skeleton/RecommendRecipeSkeleton";
import RecommendRecipeCard from "./RecommendRecipeCard";

const optimizeImageUrl = (url: string) => {
  return url?.replace(/\/upload\//, "/upload/c_fill,h_1082,w_1082,f_webp/");
};

const RecommendRecipe = React.memo(({
  recommendRecipes,
  isLoading
}: {
  recommendRecipes: Recipe[],
  isLoading: boolean
}) => {
  const navigate = useNavigate();

  const showRecipe = useCallback((id: string) => {
    navigate(`/recipe/${id}`);
  }, [navigate]);

  const optimizedImages = useMemo(() => {
    return recommendRecipes.map((recipe) => optimizeImageUrl(recipe.images[0]));
  }, [recommendRecipes]);

  if (isLoading) {
    return <RecipeSkeleton />;
  }

  return (
    <div className="container mx-auto lg:px-[100px] md:px-[50px] sm:px-[20px] p-8">
      <div className="space-y-2 text-center mb-6">
        <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
          맞춤 추천
        </span>
        <h2 className="text-2xl font-bold text-gray-800">
          오늘의 추천 레시피
        </h2>
        <p className="text-sm text-gray-600">
          당신을 위해 엄선된 특별한 레시피
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="col-span-2 row-span-2">
          <RecommendRecipeCard
            src={optimizedImages[0]}
            alt={recommendRecipes[0]?.name}
            onClick={() => showRecipe(recommendRecipes[0]._id || "")}
            size="large"
            category={recommendRecipes[0].categories?.food}
            cookTime={recommendRecipes[0].time}
            featured={true}
          />
        </div>

        <RecommendRecipeCard
          src={optimizedImages[1]}
          alt={recommendRecipes[1]?.name}
          onClick={() => showRecipe(recommendRecipes[1]._id || "")}
          category={recommendRecipes[1].categories?.food}
          cookTime={recommendRecipes[1].time}
        />
        <RecommendRecipeCard
          src={optimizedImages[2]}
          alt={recommendRecipes[2]?.name}
          onClick={() => showRecipe(recommendRecipes[2]._id || "")}
          category={recommendRecipes[2].categories?.food}
          cookTime={recommendRecipes[2].time}
        />
        <RecommendRecipeCard
          src={optimizedImages[3]}
          alt={recommendRecipes[3]?.name}
          onClick={() => showRecipe(recommendRecipes[3]._id || "")}
          category={recommendRecipes[3].categories?.food}
          cookTime={recommendRecipes[3].time}
        />
        <RecommendRecipeCard
          src={optimizedImages[4]}
          alt={recommendRecipes[4]?.name}
          onClick={() => showRecipe(recommendRecipes[4]._id || "")}
          category={recommendRecipes[4].categories?.food}
          cookTime={recommendRecipes[4].time}
        />
      </div>
    </div>
  );
});

export default RecommendRecipe;
