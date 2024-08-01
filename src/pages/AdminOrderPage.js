import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Box,
  Select,
  MenuItem,
  TextField,
  Button,
  Stack,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OrderTable from "../component/OrderTable/OrderTable";
import DashBoardCard from "../component/DashBoardCard/DashboardCard";
import OrderDetailDialog from "../component/OrderDetailDialog/OrderDetailDialog";
import { setSelectedOrder } from "../redux/orderSlice";
import { endOfDay, format, isValid, startOfDay } from "date-fns";
import DateFilterCondition from "../component/DateFilterCondition/DateFilterCondition";
import { useFetchOrderList } from "../hooks/Order/useFetchOrderList";

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
    startDate: query.get("startDate") || null,
    endDate: query.get("endDate") || null,
  });
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("orderNum");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { data, isLoading } = useFetchOrderList(searchQuery);

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
    const params = new URLSearchParams(searchQuery);
    navigate("?" + params.toString());
  }, [searchQuery, navigate]);

  const openEditForm = (order) => {
    setOpen(true);
    dispatch(setSelectedOrder(order));
  };

  const handlePageChange = (event, value) => {
    setSearchQuery({ ...searchQuery, page: value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getOrderCountByStatus = (status) => {
    return data?.data?.filter((order) => order.status === status).length || 0;
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (startDate && endDate && isValid(startDate) && isValid(endDate)) {
      const formattedStartDate = startOfDay(startDate);
      const formattedEndDate = endOfDay(endDate);

      setSearchQuery((prev) => ({
        ...prev,
        startDate: format(formattedStartDate, "yyyy-MM-dd HH:mm:ss"),
        endDate: format(formattedEndDate, "yyyy-MM-dd HH:mm:ss"),
      }));
    } else {
      setSearchQuery((prev) => ({ ...prev, startDate: null, endDate: null }));
    }
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedOption("orderNum");
    setSearchQuery({
      page: 1,
      orderNum: "",
      startDate: null,
      endDate: null,
    });
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress size="100px" sx={{color: "green"}} />
      </Container>
    );
  }

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
        data={data?.data}
        openEditForm={openEditForm}
        badgeBg={badgeBg}
      />

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Stack spacing={2}>
          <Pagination
            count={data?.totalPageNum}
            page={searchQuery.page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Stack>
      </Box>

      {open && <OrderDetailDialog open={open} handleClose={handleClose} />}
    </Container>
  );
};

export default AdminOrderPage;
