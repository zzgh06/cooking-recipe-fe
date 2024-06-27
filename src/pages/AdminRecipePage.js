import React, { useEffect, useState } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from '../component/SearchBox/SerachBox';
import RecipeTable from '../component/RecipeTable/RecipeTable';
import ReactPaginate from "react-paginate";
import { fetchRecipes, createRecipe, editRecipe, deleteRecipe } from "../redux/recipeSlice";
import RecipeForm from '../component/RecipeForm/RecipeForm';
import { useSearchParams } from "react-router-dom";
import '../style/adminRecipe.style.css';

const AdminRecipePage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({ page: 1, name: "" });
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState("new");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const recipeList = useSelector(state => state.recipe.recipes || []); 
  const totalPageNumber = useSelector(state => state.recipe.totalPages || 0); 

  const tableHeader = ["#", "Name", "Category", "Time", "Servings", "Difficulty","reviewCnt", "Images", "Actions"];

  useEffect(() => {
    dispatch(fetchRecipes(searchQuery));
  }, [dispatch, searchQuery]);
   console.log("recipeList",recipeList)
  useEffect(() => {
    console.log('Redux State:', recipeList); 
    console.log('Total Pages:', totalPageNumber);
  }, [recipeList, totalPageNumber]);

  const handleShowAll = () => {
    setSearchQuery({ page: 1, name: "" });
  };

  const handleClickNewItem = () => {
    setMode("new");
    setSelectedRecipe(null);
    setShowForm(true);
  };

  const openEditForm = (recipe) => {
    console.log('Editing recipe with ID:', recipe._id); 
    setSelectedRecipe(recipe);
    setMode("edit");
    setShowForm(true);
  };

  const handlePageClick = (event) => {
    setSearchQuery({ ...searchQuery, page: event.selected + 1 });
  };

  const handleSearch = (searchTerm) => {
    setSearchQuery({ ...searchQuery, name: searchTerm, page: 1 });
  };

  const deleteItem = (id) => {
    console.log('deleteItem recipe with ID:', id); 
    dispatch(deleteRecipe(id));
  };

  const handleFormSubmit = (recipeData) => {
    if (mode === "new") {
      dispatch(createRecipe(recipeData));
    } else {
      console.log("selectedRecipe id",selectedRecipe._id)
      dispatch(editRecipe({ id: selectedRecipe._id, updatedData: recipeData }));
    }
    setShowForm(false);
  };

  return (
    <div className="locate-center">
      <Container className="container-custom">
        <div className="mt-2 top-container">
          <SearchBox
            onCheckEnter = {handleSearch}
            placeholder="레시피 이름으로 검색"
            field="name"
          />
          <Button className="recipes mt-2 mb-2" onClick={handleShowAll}>
            Show All
          </Button>
        </div>
        <div className="button-container">
          <Button className="recipes mt-2 mb-2" onClick={handleClickNewItem}>
            Add New Recipe +
          </Button>
        </div>

        <Modal show={showForm} onHide={() => setShowForm(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{mode === "new" ? "Add New Recipe" : "Edit Recipe"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RecipeForm onSubmit={handleFormSubmit} initialData={selectedRecipe} />
          </Modal.Body>
        </Modal>

        <RecipeTable
          header={tableHeader}
          data={recipeList}
          deleteItem={deleteItem}
          openEditForm={openEditForm}
        />

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
      </Container>
    </div>
  );
};

export default AdminRecipePage;
