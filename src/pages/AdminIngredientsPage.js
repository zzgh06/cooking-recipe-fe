import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "../component/SearchBox/SerachBox";
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
import "../style/adminIngredient.style.css";

const AdminIngredientsPage = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useSearchParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    orderNum: query.get("orderNum") || "",
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
    <div className="locate-center">
      <Container className="container-custom">
        <div className="mt-2 top-container">
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="재료 이름으로 검색"
            field="name"
          />
          <Button className="ingredients mt-2 mb-2" onClick={handleShowAll}>
            Show All
          </Button>
        </div>
        <div className="button-container">
          <Button
            className="ingredients mt-2 mb-2"
            onClick={handleClickNewItem}
          >
            Add New Item +
          </Button>
        </div>

        <IngredientTable
          header={tableHeader}
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
