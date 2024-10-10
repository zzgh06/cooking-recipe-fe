import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faSignal } from "@fortawesome/free-solid-svg-icons";
import { Recipe } from "../../types";

const optimizeImageUrl = (url: string) => {
  return url?.replace(/\/upload\//, '/upload/c_fill,h_504,w_504,f_auto,q_auto,f_webp/');
};

interface RecipeCardProps {
  item: Recipe; 
}

const RecipeCard = React.memo(({ item }: RecipeCardProps) => {
  const navigate = useNavigate();
  const optimizedImageUrl = useMemo(() => optimizeImageUrl(item.images[0]), [item.images]);

  const showRecipe = useCallback((id: string) => {
    navigate(`/recipe/${id}`);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center relative mb-2 p-2 w-full transition-all duration-300 ease-in-out">
      <img
        src={optimizedImageUrl}
        alt={item.name}
        className="w-full h-auto max-w-[400px] max-h-[220px] aspect-video object-cover rounded-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
        loading="eager"
        fetchPriority="high"
        onClick={() => showRecipe(item._id || "")}
      />
      <div className="p-2">
        <h6 className="text-xl font-semibold text-center line-clamp-1 max-w-xs sm:max-w-sm md:max-w-md">
          {item.name}
        </h6>
        <div className="flex justify-center text-gray-500 mt-2">
          <p className="flex items-center pr-4">
            <FontAwesomeIcon icon={faSignal} className="mr-1" /> {item.difficulty}
          </p>
          <p className="flex items-center">
            <FontAwesomeIcon icon={faClock} className="mr-1" /> {item.time?.split("이내")[0]}
          </p>
        </div>
      </div>
    </div>
  );
});

export default RecipeCard;
