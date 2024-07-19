import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Modal, Typography, Box } from "@mui/material";
import SearchBox from "../component/SearchBox/SearchBox";
import RecipeTable from "../component/RecipeTable/RecipeTable";
import ReactPaginate from "react-paginate";
import {
  fetchRecipes,
  createRecipe,
  editRecipe,
  deleteRecipe,
} from "../redux/recipeSlice";
import RecipeForm from "../component/RecipeForm/RecipeForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import { styled } from "@mui/material/styles";


const PaginationContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(2),
}));

const AdminRecipePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    name: query.get("name") || "",
  });
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState("new");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const recipeList = useSelector((state) => state.recipe.recipes || []);
  const totalPageNumber = useSelector((state) => state.recipe.totalPages || 0);

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

  useEffect(() => {
    dispatch(fetchRecipes(searchQuery));
  }, [dispatch, searchQuery]);

  const handleShowAll = () => {
    setSearchQuery({ page: 1, name: "" });
  };

  const handleClickNewItem = () => {
    setMode("new");
    setSelectedRecipe(null);
    setShowForm(true);
  };

  const openEditForm = (recipe) => {
    setSelectedRecipe(recipe);
    setMode("edit");
    setShowForm(true);
  };

  const handlePageClick = (event) => {
    setSearchQuery({ ...searchQuery, page: event.selected + 1 });
  };

  const deleteItem = (id) => {
    dispatch(deleteRecipe(id));
  };

  const handleFormSubmit = (recipeData) => {
    if (mode === "new") {
      dispatch(createRecipe(recipeData));
    } else {
      dispatch(editRecipe({ id: selectedRecipe._id, updatedData: recipeData }));
    }
    setShowForm(false);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 2 }}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search by recipe name"
            field="name"
          />
          <Button variant="contained" color="primary" onClick={handleShowAll} sx={{ width : "300px"}}>
            Show All
          </Button>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Button variant="contained" color="success" onClick={handleClickNewItem} sx={{ width : "300px"}}>
            Add New Recipe +
          </Button>
        </Box>

        <Modal
          open={showForm}
          onClose={() => setShowForm(false)}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'scroll' }}
        >
          <Box
            sx={{
              p: 3,
              width: '80%',
              maxWidth: 800,
              maxHeight: '80vh',
              overflowY: 'auto',
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,          
            }}
          >
            <Typography variant="h6" gutterBottom>
              {mode === "new" ? "Add New Recipe" : "Edit Recipe"}
            </Typography>
            <RecipeForm
              onSubmit={handleFormSubmit}
              initialData={selectedRecipe}
            />
          </Box>
        </Modal>

        <RecipeTable
          header={tableHeader}
          data={recipeList}
          deleteItem={deleteItem}
          openEditForm={openEditForm}
        />

        <PaginationContainer>
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPageNumber}
            forcePage={searchQuery.page - 1}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
          />
        </PaginationContainer>
      </Box>
    </Container>
  );
};

export default AdminRecipePage;
