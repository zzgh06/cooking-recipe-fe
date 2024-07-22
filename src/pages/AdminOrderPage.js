import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Box, Select, MenuItem, TextField, Button } from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OrderTable from "../component/OrderTable/OrderTable";
import DashBoardCard from "../component/DashBoardCard/DashboardCard";
import OrderDetailDialog from "../component/OrderDetailDialog/OrderDetailDialog";
import { getOrderList, setSelectedOrder } from "../redux/orderSlice";
import SearchBox from "../component/SearchBox/SearchBox";
import ReactPaginate from "react-paginate";
import { styled } from "@mui/material/styles";
import { endOfDay, format, isValid, startOfDay } from "date-fns";
import DateFilterCondition from "../component/DateFilterCondition/DateFilterCondition";

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
  const [selectedOption, setSelectedOption] = useState("orderNum");
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
    // Update URL parameters only
    const params = new URLSearchParams(searchQuery);
    navigate("?" + params.toString());
  }, [searchQuery, navigate]);

  useEffect(() => {
    // Fetch orders whenever searchQuery or page changes
    dispatch(getOrderList({ ...searchQuery, page }));
  }, [searchQuery, page, dispatch]);

  const openEditForm = (order) => {
    setOpen(true);
    dispatch(setSelectedOrder(order));
  };

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getOrderCountByStatus = (status) => {
    return orderList?.filter((order) => order.status === status).length || 0;
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (
      startDate &&
      endDate &&
      isValid(new Date(startDate)) &&
      isValid(new Date(endDate))
    ) {
      const formattedStartDate = startOfDay(new Date(startDate));
      const formattedEndDate = endOfDay(new Date(endDate));

      setSearchQuery({
        ...searchQuery,
        startDate: format(formattedStartDate, "yyyy-MM-dd HH:mm:ss"),
        endDate: format(formattedEndDate, "yyyy-MM-dd HH:mm:ss"),
      });
    } else {
      setSearchQuery({ ...searchQuery, startDate: null, endDate: null });
    }
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedOption("orderNum");
    setSearchQuery({
      page: 1,
      orderNum: "",
    });
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Grid
        container
        border={3}
        borderRadius={4}
        sx={{ borderColor: "success.main", opacity: "70%" }}
        p={3}
      >
        <Grid container>
          <DateFilterCondition
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </Grid>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} md={2}>
            <Select
              value={selectedOption || ""}
              onChange={(event) => {
                setSelectedOption(event.target.value);
              }}
              fullWidth
              sx={{ width: "120px", height: "40px" }}
            >
              <MenuItem value="orderNum">주문번호</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              label={selectedOption === "orderNum" ? "주문번호" : ""}
              variant="outlined"
              fullWidth
              value={searchQuery[selectedOption] || ""}
              placeholder="내용을 입력해주세요."
              InputLabelProps={{ shrink: true, style: { top: 0 } }}
              InputProps={{ style: { height: "40px", padding: "0 14px" } }}
              sx={{ width: "280px", height: "40px" }}
              onChange={(event) =>
                setSearchQuery({
                  ...searchQuery,
                  [selectedOption]: event.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12} md={8} align="right">
            <Button
              variant="contained"
              color="success"
              size="small"
              fullWidth
              sx={{ marginRight: "10px", width: "13ch", height: "40px" }}
              onClick={handleSearch}
            >
              조회
            </Button>
            <Button
              variant="contained"
              color="success"
              size="small"
              sx={{ marginRight: "10px", width: "13ch", height: "40px" }}
              onClick={handleReset}
            >
              초기화
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={1} sx={{ margin: "10px 0" }}>
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
