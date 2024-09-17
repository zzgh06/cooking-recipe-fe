import React, { useState } from "react";
import { Box, Button, CircularProgress, Container, Pagination, Stack } from "@mui/material";
import SearchBox from "../component/SearchBox/SearchBox";
import IngredientTable from "../component/IngredientTable/IngredientTable";
import NewItemDialog from "../component/NewItemDialog/NewItemDialog";
import { useSearchParams } from "react-router-dom";
import { useFetchIngredients } from "../hooks/Ingredient/useFetchIngredients";
import { useDeleteIngredient } from "../hooks/Ingredient/useDeleteIngredient";
import { Ingredient, SearchQuery } from "../types";



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

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setSearchQuery((prev) => ({ ...prev, page: value }));
  };

  const deleteItem = (id: string) => {
    deleteIngredient(id);
    refetch();
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress size="100px" sx={{color: "green"}} />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 2, mb: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="재료 이름으로 검색"
            field="name"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleShowAll}
            sx={{ width: "300px" }}
          >
            Show All
          </Button>
        </Box>
        <Box sx={{ mt: 2, width: "300px" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClickNewItem}
          >
            Add New Item +
          </Button>
        </Box>
      </Box>

      <IngredientTable
        header={tableHeader}
        data={data?.ingredients}
        deleteItem={deleteItem}
        openEditForm={openEditForm}
      />

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Stack spacing={2}>
          <Pagination
            count={data?.totalPages}
            page={Number(searchQuery.page)} 
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Stack>
      </Box>

      <NewItemDialog
        mode={mode}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        selectedIngredient={selectedIngredient}
      />
    </Container>
  );
};

export default AdminIngredientsPage;
