import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEditRecipe } from "../../hooks/Recipe/useEditRecipe";
import { RootState } from "../../redux/store";
import { Recipe, SearchQuery } from "../../types";
import { useFetchRecipes } from "../../hooks/Recipe/useFetchRecipes";
import RecipeForm from "../RecipeForm/RecipeForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";


const MyRecipeComponent = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const { mutate: editRecipe } = useEditRecipe();
  const { data: recipesData, refetch } = useFetchRecipes({} as SearchQuery);

  const userRecipes = recipesData?.recipes?.filter(
    (recipe: Recipe) => recipe.userId === user?._id
  );

  const handleRecipe = (id: string) => {
    navigate(`/recipe/${id}`);
  };

  const openEditForm = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setMode("edit");
    setShowForm(true);
  };

  const handleFormSubmit = (recipeData: Recipe) => {
    if (selectedRecipe) {
      editRecipe({ id: selectedRecipe._id || "", updatedData: recipeData });
      refetch();
      setShowForm(false);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <div className="flex justify-start items-baseline border-b-4 border-black pl-2">
            <h5 className="text-2xl font-semibold">나의 정보</h5>
            <p className="ml-4 text-lg">내 레시피</p>
          </div>
        </div>
        {userRecipes && userRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {userRecipes.map((recipe) => (
              <div key={recipe._id} className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  className="w-full h-40 object-cover"
                  src={recipe.images[0] || "/default-image.jpg"}
                  alt={recipe.name}
                />
                <div className="p-4">
                  <h6 className="text-xl font-semibold truncate">{recipe.name}</h6>
                  <p className="text-gray-600 text-sm truncate">
                    {recipe.description || "No description available"}
                  </p>
                </div>
                <div className="flex justify-center p-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mr-2"
                    onClick={() => openEditForm(recipe)}
                  >
                    수정
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                    onClick={() => handleRecipe(recipe._id || "")}
                  >
                    보기
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-10 p-5 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-600 text-lg font-semibold italic">
              작성한 레시피가 없습니다.
            </p>
            <button
              className="mx-auto flex items-center justify-center max-w-[500px] bg-black text-white px-6 py-2 mt-4 rounded-lg"
              onClick={() => navigate("/account/recipe")}
            >
              레시피 등록하기
              <FontAwesomeIcon icon={faCirclePlus} />
            </button>
            <p className="text-sm mt-2">
              새로운 레시피를 추가하려면 위의 버튼을 클릭하세요.
            </p>
          </div>
        )}

        {showForm && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
            onClick={() => setShowForm(false)}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h6 className="text-3xl text-center font-bold mb-4">
                {mode === "new" ? "레시피 작성" : "레시피 수정"}
              </h6>
              <RecipeForm
                onSubmit={handleFormSubmit}
                initialData={selectedRecipe || undefined}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyRecipeComponent;
