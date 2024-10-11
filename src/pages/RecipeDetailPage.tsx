import React, { useEffect, useState, useCallback, Suspense } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faSearch,
  faBookmark as solidBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import { useFetchRecipeById } from "../hooks/Recipe/useFetchRecipeById";
import { useRecipeFavorite } from "../hooks/Favorite/useRecipeFavorite";
import { useAddRecipeFavorite } from "../hooks/Favorite/useAddRecipeFavorite";
import { useDeleteRecipeFavorite } from "../hooks/Favorite/useDeleteRecipeFavorite";
import { RootState } from "../redux/store";
import KakaoShareButton from "../component/KakaoShareButton/KakaoShareButton";
import CopyClipButton from "../component/CopyClipButton/CopyClipButton";
import RecipeCategory from "../component/RecipeCategory/RecipeCategory";
import RecipeDetailSkeleton from "../component/Skeleton/RecipeDetailSkeleton";

const Review = React.lazy(() => import("../component/Review/Review"));
const IngredientDialog = React.lazy(() =>
  import("../component/IngredientDialog/IngredientDialog")
);
const ShoppingListDialog = React.lazy(() =>
  import("../component/ShoppingListDialog/ShoppingListDialog")
);

interface Step {
  _id?: string;
  image: string | null;
  description: string;
}

interface IngredientSummary {
  name: string;
  qty: number;
  unit: string;
}

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: recipeDetail, isLoading } = useFetchRecipeById(id || "");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [openIngredientDialog, setOpenIngredientDialog] = useState<boolean>(false);
  const [openShoppingListDialog, setOpenShoppingListDialog] = useState<boolean>(false);
  const { data: recipeFavorite } = useRecipeFavorite();
  const { mutate: addRecipeFavorite } = useAddRecipeFavorite();
  const { mutate: deleteRecipeFavorite } = useDeleteRecipeFavorite();

  useEffect(() => {
    if (recipeDetail && recipeFavorite) {
      setIsFavorite(recipeFavorite.recipes.includes(recipeDetail._id));
    }
  }, [recipeDetail, recipeFavorite]);

  const handleFavoriteClick = useCallback(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (isFavorite && recipeDetail) {
      deleteRecipeFavorite(recipeDetail._id || "");
    } else if (recipeDetail) {
      addRecipeFavorite(recipeDetail._id || "");
    }
    setIsFavorite((prev) => !prev);
  }, [isFavorite, user, navigate, recipeDetail, addRecipeFavorite, deleteRecipeFavorite]);

  const handleClickOpenIngredientDialog = () => setOpenIngredientDialog(true);
  const handleCloseIngredientDialog = () => setOpenIngredientDialog(false);

  const handleClickOpenShoppingListDialog = () => setOpenShoppingListDialog(true);
  const handleCloseShoppingListDialog = () => setOpenShoppingListDialog(false);

  const handlePurchaseClick = useCallback((ingredientName: string) => {
    navigate(`/search?name=${encodeURIComponent(ingredientName)}`);
  }, [navigate]);

  const getDifficultyStars = (difficulty: string) => {
    const stars: { [key: string]: string } = {
      "아무나": "⭐",
      "초급": "⭐⭐",
      "중급": "⭐⭐⭐",
      "고급": "⭐⭐⭐⭐",
      "신의경지": "⭐⭐⭐⭐⭐",
    };
    return stars[difficulty] || "";
  };

  const optimizeMainImageUrl = (url: string) => url?.replace(/\/upload\//, '/upload/c_fill,h_1704,w_1704,f_webp/');
  const optimizeSubImageUrl = (url: string) => url?.replace(/\/upload\//, '/upload/c_fill,h_200,w_200,f_webp/');

  if (isLoading) {
    return <RecipeDetailSkeleton />;
  }

  if (!recipeDetail) {
    return <div>레시피를 찾을 수 없습니다.</div>;
  }

  const optimizedMainImageUrl = recipeDetail.images[0] ? optimizeMainImageUrl(recipeDetail.images[0]) : "";

  return (
    <>
      <div className="container mx-auto mt-20 max-w-4xl px-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <div className="relative w-full aspect-w-16 aspect-h-9 rounded-lg mb-5 flex justify-center items-center">
              <img className="w-full max-h-[500px] rounded-lg" src={optimizedMainImageUrl} alt={recipeDetail.name} />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold">{recipeDetail.name}</h2>
              <div className="flex space-x-5">
                <div onClick={handleFavoriteClick} className="cursor-pointer text-green-700">
                  <FontAwesomeIcon icon={isFavorite && user ? solidBookmark : regularBookmark} size="lg" />
                </div>
                <div className="cursor-pointer">
                  <KakaoShareButton recipeDetail={recipeDetail} />
                </div>
                <div className="cursor-pointer">
                  <CopyClipButton recipeDetail={recipeDetail} />
                </div>
              </div>
            </div>
            <p className="mb-5">{recipeDetail.description}</p>
            <div className="flex gap-5 mb-10 pb-7 border-b-2 border-gray-300">
              <p>난이도: {getDifficultyStars(recipeDetail.difficulty)}</p>
              <p>소요시간 ⏰ : {recipeDetail.time}</p>
            </div>
          </div>
          <div>
            <h5 className="text-xl font-bold">재료</h5>
            <div className="flex space-x-4 mt-3">
              <button
                className="flex items-center px-4 py-2 border border-blue-600 rounded-md text-blue-600"
                onClick={handleClickOpenIngredientDialog}
              >
                <FontAwesomeIcon icon={faSearch} />
                <span className="ml-2">재료검색</span>
              </button>
              <button
                className="flex items-center px-6 py-2 border border-blue-600 rounded-md text-blue-600"
                onClick={handleClickOpenShoppingListDialog}
              >
                <FontAwesomeIcon icon={faCartShopping} />
                <span className="ml-2">장보기</span>
              </button>
            </div>
            <div className="mt-4 h-auto">
              <table className="min-w-full table-fixed">
                <thead>
                  <tr className="border-b">
                    <th className="w-1/2 p-2">재료</th>
                    <th className="w-1/4 p-2 text-right">양</th>
                    <th className="w-1/4 p-2 text-right">구매</th>
                  </tr>
                </thead>
                <tbody>
                  {recipeDetail.ingredients.map((ingredient, index: number) => (
                    <tr key={index} className="border-b"> 
                      <td className="p-2">{ingredient.name}</td>
                      <td className="p-2 text-right">{ingredient.qty}{ingredient.unit}</td>
                      <td className="p-2 text-right">
                        <button
                          className="px-4 py-2 border rounded-md text-blue-400"
                          onClick={() => handlePurchaseClick(ingredient.name)}
                        >
                          구매
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
          <div>
            <h5 className="text-xl font-bold mt-8">조리순서</h5>
            {recipeDetail.steps.map((step: Step, index: number) => (
              <div className="flex justify-between items-start mt-5" key={index}>
                <div className="flex items-baseline">
                  <h3 className="text-[26px] font-bold">{index + 1}.</h3>
                  <span className="ml-3 text-[20px] font-semibold">{step.description}</span>
                </div>
                {step.image && (
                  <img
                    className="ml-4 w-48 h-auto max-h-48 rounded-lg"
                    src={optimizeSubImageUrl(step.image)}
                    alt={step._id}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Suspense fallback={<div>Loading...</div>}>
              <Review type="recipe" itemId={recipeDetail._id || ""} />
            </Suspense>
          </div>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <IngredientDialog
          open={openIngredientDialog}
          handleClose={handleCloseIngredientDialog}
          ingredients={recipeDetail.ingredients}
        />
        <ShoppingListDialog
          open={openShoppingListDialog}
          handleClose={handleCloseShoppingListDialog}
          ingredients={recipeDetail.ingredients}
        />
      </Suspense>
    </>
  );
};

export default RecipeDetail;

