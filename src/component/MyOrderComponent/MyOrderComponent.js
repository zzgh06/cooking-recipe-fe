import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Select,
  MenuItem,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TableContainer,
  Paper,
  styled,
  Pagination,
  Container,
  CircularProgress,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format, isValid, startOfDay, endOfDay } from "date-fns";
import DateFilterCondition from "../DateFilterCondition/DateFilterCondition";
import { currencyFormat } from "../../utils/number";
import MyPageOrderDialog from "../MyPageOrderDialog/MyPageOrderDialog";
import { setSelectedOrder } from "../../redux/orderSlice";
import { useFetchOrder } from "../../hooks/Order/useFetchOrder";

// 테이블 셀 스타일
const cellStyle1 = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "150px",
  color: "white",
};

const cellStyle2 = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "150px",
};

const HeadContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "baseline",
  borderBottom: "4px solid black",
  paddingLeft: "10px",
});

const MyOrderComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState({});
  const [recentChecked, setRecentChecked] = useState(false);
  const [oldChecked, setOldChecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState("orderNum");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useFetchOrder({ ...searchQuery, page });

  const orderList = data?.orderList || [];
  const totalPageNum = data?.totalPages || 1;

  const [sortedOrderList, setSortedOrderList] = useState([]);

  useEffect(() => {
    if (searchQuery.orderNum === "") delete searchQuery.orderNum;
    const params = new URLSearchParams(searchQuery);
    navigate("?" + params.toString());
  }, [searchQuery, page, navigate]);

  useEffect(() => {
    let sortedList = [...orderList];
    if (recentChecked) {
      sortedList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (oldChecked) {
      sortedList.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    setSortedOrderList(sortedList);
  }, [orderList, recentChecked, oldChecked]);

  const handleRecentChange = (event) => {
    setRecentChecked(event.target.checked);
    setOldChecked(!event.target.checked);
  };

  const handleOldChange = (event) => {
    setOldChecked(event.target.checked);
    setRecentChecked(!event.target.checked);
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

  const handleOpenDialog = (order) => {
    setDialogOpen(true);
    dispatch(setSelectedOrder(order));
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    setSortedOrderList(orderList);
  };

  const handleReset = () => {
    setRecentChecked(false);
    setOldChecked(false);
    setStartDate(null);
    setEndDate(null);
    setSelectedOption("orderNum");
    setSearchQuery({});
    setPage(1);
  };

  if (isLoading)
    return (
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress size="100px" sx={{color: "green"}} />
      </Container>
    );

  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <HeadContainer>
          <Typography variant="h5">쇼핑</Typography>
          <Typography variant="subtitle1">내주문</Typography>
        </HeadContainer>
      </Grid>
      <Grid item xs={12} md={12}>
        <Box mt={2}>
          <Typography variant="subtitle" ml={1} mb={1}>
            최대 지난 3년간의 주문내역까지 확인할 수 있어요
          </Typography>
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
            {/* 주문 번호 검색 */}
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
          {/* 정렬기준 */}
          <Box sx={{ mt: "10px" }}>
            <FormGroup
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={recentChecked}
                    onChange={handleRecentChange}
                  />
                }
                label={<Typography variant="body2">최근순</Typography>}
              />
              <FormControlLabel
                control={
                  <Checkbox checked={oldChecked} onChange={handleOldChange} />
                }
                label={<Typography variant="body2">오래된순</Typography>}
              />
            </FormGroup>
          </Box>
          {/* 주문 내역 테이블 */}
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            주문 내역/배송 상태
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "green" }}>
                  <TableCell style={cellStyle1}>주문번호</TableCell>
                  <TableCell style={cellStyle1}>주문일자</TableCell>
                  <TableCell style={cellStyle1}>주문내역</TableCell>
                  <TableCell style={cellStyle1}>총주문액</TableCell>
                  <TableCell style={cellStyle1}>주문상태</TableCell>
                </TableRow>
              </TableHead>
              {/* 테이블 바디 */}
              <TableBody>
                {sortedOrderList?.length > 0 ? (
                  sortedOrderList.map((item) => (
                    <TableRow
                      key={item._id}
                      onClick={() => handleOpenDialog(item)}
                    >
                      <TableCell style={{ ...cellStyle2, cursor: "pointer" }}>
                        {item.orderNum}
                      </TableCell>
                      <TableCell style={cellStyle2}>
                        {item.createdAt.slice(0, 10)}
                      </TableCell>
                      <TableCell style={cellStyle2}>
                        {item?.items
                          ?.map((item) => item.ingredientId?.name)
                          .join(", ")
                          .slice(0, 25)}
                        {item?.items
                          ?.map((item) => item.ingredientId?.name)
                          .join(", ").length > 25
                          ? "..."
                          : ""}
                      </TableCell>
                      <TableCell style={cellStyle2}>
                        {currencyFormat(item.totalPrice)}
                      </TableCell>
                      <TableCell style={cellStyle2}>{item.status}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Typography>No Data to show</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        >
          <Pagination
            count={totalPageNum}
            size="large"
            sx={{ marginBottom: "20px" }}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
        {/* 주문 상세 다이얼로그 */}
        <MyPageOrderDialog open={dialogOpen} handleClose={handleCloseDialog} />
      </Grid>
    </Grid>
  );
};

export default MyOrderComponent;
