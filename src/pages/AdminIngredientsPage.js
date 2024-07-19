import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "../component/SearchBox/SearchBox";
import IngredientTable from "../component/IngredientTable/IngredientTable";
import NewItemDialog from "../component/NewItemDialog/NewItemDialog";
import ReactPaginate from "react-paginate";
import {
  fetchIngredients,
  createIngredient,
  editIngredient,
  deleteIngredient,
} from "../redux/ingredientSlice";
import { useSearchParams } from "react-router-dom";

const AdminIngredientsPage = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    name: query.get("name") || "",
  });
  const [showDialog, setShowDialog] = useState(false);
  const [mode, setMode] = useState("new");
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const ingredientList = useSelector(
    (state) => state.ingredients.ingredients || []
  );
  const totalPageNumber = useSelector(
    (state) => state.ingredients.totalPages || 0
  );

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

  useEffect(() => {
    dispatch(fetchIngredients(searchQuery));
  }, [dispatch, searchQuery]);

  const handleShowAll = () => {
    setSearchQuery({ page: 1, name: "" });
  };

  const handleClickNewItem = () => {
    setMode("new");
    setSelectedIngredient(null);
    setShowDialog(true);
  };

  const openEditForm = (ingredient) => {
    setSelectedIngredient(ingredient);
    setMode("edit");
    setShowDialog(true);
  };

  const handlePageClick = (event) => {
    setSearchQuery({ ...searchQuery, page: event.selected + 1 });
  };

  const deleteItem = (id) => {
    dispatch(deleteIngredient(id));
  };

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
          <Button variant="contained" color="primary" onClick={handleShowAll} sx={{width: "300px"}}>
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
        data={ingredientList}
        deleteItem={deleteItem}
        openEditForm={openEditForm}
      />

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
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
