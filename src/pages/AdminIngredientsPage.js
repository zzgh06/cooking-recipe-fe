// src/pages/AdminIngredientsPage.js
import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from '../component/Navbar/SearchBox';
import IngredientTable from '../component/IngredientTable/IngredientTable';
import NewItemDialog from '../component/NewItemDialog/NewItemDialog';
import ReactPaginate from "react-paginate";
import { fetchIngredients, createIngredient, editIngredient, deleteIngredient } from "../redux/ingredientSlice";
import { useSearchParams, useNavigate } from "react-router-dom";


const AdminIngredientsPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({ page: 1, name: "" });
  const [showDialog, setShowDialog] = useState(false);
  const [mode, setMode] = useState("new");
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const ingredientList = useSelector(state => state.ingredients.ingredients);
  const totalPageNumber = useSelector(state => state.ingredients.totalPages);

  useEffect(() => {
    dispatch(fetchIngredients(searchQuery));
  }, [dispatch, searchQuery]);

  const handleShowAll = () => {
    setSearchQuery({ page: 1, name: "" });
  };

  const handleClickNewItem = () => {
    setMode("new");
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
    <div className="locate-center">
      <Container>
        <div className="mt-2 top-container">
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="제품 이름으로 검색"
            field="name"
          />
          <Button className="mt-2 mb-2" onClick={handleShowAll}>
            Show All
          </Button>
        </div>
        <Button className="mt-2 mb-2" onClick={handleClickNewItem}>
          Add New Item +
        </Button>
        <IngredientTable
          header={["#", "SKU", "Name", "Price", "Stock", "Image", "Status", "Actions"]}
          data={ingredientList}
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
          className="display-center list-style-none"
        />
      </Container>
      <NewItemDialog
        mode={mode}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        selectedIngredient={selectedIngredient}
      />
    </div>
  );
};

export default AdminIngredientsPage;
