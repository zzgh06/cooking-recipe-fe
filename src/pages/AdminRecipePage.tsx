import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetchRecipes } from "../hooks/Recipe/useFetchRecipes";
import { useCreateRecipe } from "../hooks/Recipe/useCreateRecipe";
import { useEditRecipe } from "../hooks/Recipe/useEditRecipe";
import { useDeleteRecipe } from "../hooks/Recipe/useDeleteRecipe";
import { Recipe, SearchQuery } from "../types";
import SearchBox from "../component/SearchBox/SearchBox";
import RecipeTable from "../component/RecipeTable/RecipeTable";
import RecipeForm from "../component/RecipeForm/RecipeForm";
import PaginationComponent from "../component/Pagination/PaginationComponent";

const AdminRecipePage = () => {
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    page: Number(query.get("page")) || 1,
    name: query.get("name") || "",
  });
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState("new");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const { data: recipesData, isLoading } = useFetchRecipes(searchQuery);
  const { mutate: createRecipe } = useCreateRecipe();
  const { mutate: editRecipe } = useEditRecipe();
  const { mutate: deleteRecipe } = useDeleteRecipe();

  const totalPages: number = recipesData?.totalPages || 0;
  const itemsPerPage: number = 1;

  const tableHeader = [
    "#",
    "Name",
    "Category",
    "Time",
    "Servings",
    "Difficulty",
    "Review Count",
    "Images",
    "Actions",
  ];

  const handleShowAll = () => {
    setSearchQuery({ page: 1, name: "" });
  };

  const handleClickNewItem = () => {
    setMode("new");
    setSelectedRecipe(null);
    setShowForm(true);
  };

  const openEditForm = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setMode("edit");
    setShowForm(true);
  };

  const handlePageChange = (pageNumber: number) => {
    setSearchQuery({ ...searchQuery, page: pageNumber });
  };

  const deleteItem = (id: string) => {
    deleteRecipe(id);
  };

  const handleFormSubmit = (recipeData: Recipe) => {
    if (mode === "new") {
      createRecipe(recipeData);
    } else {
      editRecipe({ id: selectedRecipe?._id || "", updatedData: recipeData });
    }
    setShowForm(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="h-24 w-24 border-8 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mt-4">
        <div className="flex justify-between items-center mb-4 max-w-[1100px]">
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="원하는 레시피를 입력해주세요."
            field="name"
          />
          <button
            className="w-full max-w-[200px] bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-4"
            onClick={handleShowAll}
          >
            Show All
          </button>
        </div>

        <div className="mb-4">
          <button
            className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-600"
            onClick={handleClickNewItem}
          >
            Add New Recipe +
          </button>
        </div>

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

        <RecipeTable
          header={tableHeader}
          data={recipesData?.recipes ?? []}
          deleteItem={deleteItem}
          openEditForm={openEditForm}
        />

        <PaginationComponent
          activePage={Number(searchQuery.page)}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AdminRecipePage;
