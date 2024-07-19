import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OrderTable from "../component/OrderTable/OrderTable";
import DashBoardCard from "../component/DashBoardCard/DashboardCard";
import OrderDetailDialog from "../component/OrderDetailDialog/OrderDetailDialog";
import { getOrderList, setSelectedOrder } from "../redux/orderSlice";
import SearchBox from "../component/SearchBox/SearchBox";
import ReactPaginate from "react-paginate";
import { styled } from "@mui/material/styles";

const PaginationWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
}));

const badgeBg = {
  preparing: "primary",
  shipping: "warning",
  refund: "error",
  delivered: "success",
};

const AdminOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    orderNum: query.get("orderNum") || "",
  });
  const [open, setOpen] = useState(false);
  const totalPageNum = useSelector((state) => state.order.totalPageNum);
  const { orderList } = useSelector((state) => state.order);

  const tableHeader = [
    "#",
    "Order#",
    "Order Date",
    "User",
    "Order Item",
    "Address",
    "Total Price",
    "Status",
  ];

  useEffect(() => {
    dispatch(getOrderList({ ...searchQuery }));
  }, [searchQuery, dispatch]);

  useEffect(() => {
    if (searchQuery.orderNum === "") {
      delete searchQuery.orderNum;
    }
    const params = new URLSearchParams(searchQuery);
    const queryString = params.toString();
    navigate("?" + queryString);
  }, [searchQuery, navigate]);

  const openEditForm = (order) => {
    setOpen(true);
    dispatch(setSelectedOrder(order));
  };

  const handlePageClick = ({ selected }) => {
    setSearchQuery({ ...searchQuery, page: selected + 1 });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getOrderCountByStatus = (status) => {
    return orderList?.filter((order) => order.status === status).length || 0;
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
        <SearchBox
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="오더번호"
          field="orderNum"
        />
      </Box>

      <Grid container spacing={1} sx={{ mb: 2 }}>
        {Object.keys(badgeBg).map((status) => (
          <Grid item xs={12} sm={6} md={3} key={status}>
            <DashBoardCard
              status={status}
              count={getOrderCountByStatus(status)}
              borderColor={badgeBg[status]}
            />
          </Grid>
        ))}
      </Grid>

      <OrderTable
        header={tableHeader}
        data={orderList}
        openEditForm={openEditForm}
        badgeBg={badgeBg}
      />

      <PaginationWrapper>
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPageNum}
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
      </PaginationWrapper>

      {open && <OrderDetailDialog open={open} handleClose={handleClose} />}
    </Container>
  );
};

export default AdminOrderPage;
