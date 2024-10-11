import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetchIngredients } from "../hooks/Ingredient/useFetchIngredients";
import { useDeleteIngredient } from "../hooks/Ingredient/useDeleteIngredient";
import { Ingredient, SearchQuery } from "../types";
import SearchBox from "../component/SearchBox/SearchBox";
import IngredientTable from "../component/IngredientTable/IngredientTable";
import NewItemDialog from "../component/NewItemDialog/NewItemDialog";
import PaginationComponent from "../component/Pagination/PaginationComponent";

const AdminIngredientsPage = () => {
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    page: Number(query.get("page")) || 1,
    name: query.get("name") || "",
  });
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [mode, setMode] = useState<"new" | "edit">("new");
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const { data, refetch, isLoading } = useFetchIngredients(searchQuery);
  const { mutate: deleteIngredient } = useDeleteIngredient();

  const totalPages: number = data?.totalPages || 0;
  const itemsPerPage: number = 1;

  const tableHeader = [
    "#",
    "Name",
    "Description",
    "Price",
    "Discount %",
    "Category",
    "Stock",
    "Status",
    "Review Count",
    "Image",
    "Actions",
  ];

  const handleShowAll = () => {
    setSearchQuery({ page: 1, name: "" });
  };

  const handleClickNewItem = () => {
    setMode("new");
    setSelectedIngredient(null);
    setShowDialog(true);
  };

  const openEditForm = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    setMode("edit");
    setShowDialog(true);
  };

  const handlePageChange = (pageNumber: number) => {
    setSearchQuery({ ...searchQuery, page: pageNumber });
  };

  const deleteItem = (id: string) => {
    deleteIngredient(id);
    refetch();
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
            placeholder="재료 이름으로 검색"
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
            Add New Item +
          </button>
        </div>

        <IngredientTable
          header={tableHeader}
          data={data?.ingredients || []}
          deleteItem={deleteItem}
          openEditForm={openEditForm}
        />

        <PaginationComponent
          activePage={Number(searchQuery.page)}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={totalPages}
          onPageChange={handlePageChange}
        />

        <NewItemDialog
          mode={mode}
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          selectedIngredient={selectedIngredient}
        />
      </div>
    </div>
  );
};

export default AdminIngredientsPage;
