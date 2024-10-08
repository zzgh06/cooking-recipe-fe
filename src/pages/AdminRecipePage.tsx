import React, { useState } from "react";
import {
  Button,
  Container,
  Modal,
  Typography,
  Box,
  Stack,
  Pagination,
  CircularProgress,
} from "@mui/material";
import SearchBox from "../component/SearchBox/SearchBox";
import RecipeTable from "../component/RecipeTable/RecipeTable";
import RecipeForm from "../component/RecipeForm/RecipeForm";
import { useSearchParams } from "react-router-dom";
import { useFetchRecipes } from "../hooks/Recipe/useFetchRecipes";
import { useCreateRecipe } from "../hooks/Recipe/useCreateRecipe";
import { useEditRecipe } from "../hooks/Recipe/useEditRecipe";
import { useDeleteRecipe } from "../hooks/Recipe/useDeleteRecipe";
import { Recipe, SearchQuery } from "../types";

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

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setSearchQuery({ ...searchQuery, page: value });
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
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress size="100px" sx={{color: "green"}} />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 2 }}>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search by recipe name"
            field="name"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleShowAll}
            sx={{ width: "300px", marginLeft: "10px" }}
          >
            Show All
          </Button>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleClickNewItem}
            sx={{ width: "300px" }}
          >
            Add New Recipe +
          </Button>
        </Box>

        <Modal
          open={showForm}
          onClose={() => setShowForm(false)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "scroll",
          }}
        >
          <Box
            sx={{
              p: 3,
              width: "80%",
              maxWidth: 800,
              maxHeight: "80vh",
              overflowY: "auto",
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
            }}
          >
            <Typography variant="h6" gutterBottom>
              {mode === "new" ? "Add New Recipe" : "Edit Recipe"}
            </Typography>
            <RecipeForm
              onSubmit={handleFormSubmit}
              initialData={selectedRecipe || undefined}
            />
          </Box>
        </Modal>

        <RecipeTable
          header={tableHeader}
          data={recipesData?.recipes ?? []}
          deleteItem={deleteItem}
          openEditForm={openEditForm}
        />

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Stack spacing={2}>
            <Pagination
              count={recipesData?.totalPages ?? 0}
              page={Number(searchQuery.page)}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
            />
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminRecipePage;
