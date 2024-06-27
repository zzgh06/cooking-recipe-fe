import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { useSearchParams, useNavigate } from "react-router-dom";
import SearchBox from "../component/Navbar/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import OrderTable from "../component/OrderTable/OrderTable";
import DashBoardCard from "../component/DashBoardCard/DashboardCard";
import OrderDetailDialog from "../component/OrderDetailDialog/OrderDetailDialog";

const AdminOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    orderNum: query.get("orderNum") || "",
  });
  const [showDialog, setShowDialog] = useState(false);
  const [mode, setMode] = useState("new");
  const [open, setOpen] = useState(false);
  // const { orderList, getOrderList, setSelectedOrder } = useSelector(state => state.orders);
  const badgeBg = {
    preparing: "primary",
    shipping: "warning",
    refund: "danger",
    delivered: "success",
  };
  const orderList = [
    {
      orderNum: "1213132",
      createdAt: "2024년 06월 20일",
      userId: { email: "admin@gmail.com" },
      items: [{ productId: { name: "홍길동" } }],
      shipTo: { address: "경기도 안산시", city: "안산" },
      totalPrice: 30000,
      status: "preparing",
    },
    {
      orderNum: "1213132",
      createdAt: "2024년 06월 20일",
      userId: { email: "admin@gmail.com" },
      items: [{ productId: { name: "홍길동" } }],
      shipTo: { address: "경기도 안산시", city: "안산" },
      totalPrice: 30000,
      status: "preparing",
    },
    {
      orderNum: "1213132",
      createdAt: "2024년 06월 20일",
      userId: { email: "admin@gmail.com" },
      items: [{ productId: { name: "홍길동" } }],
      shipTo: { address: "경기도 안산시", city: "안산" },
      totalPrice: 30000,
      status: "preparing",
    },
  ];
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

  // useEffect(() => {
  //   dispatch(getOrderList({ ...searchQuery }));
  // }, [searchQuery]);

  useEffect(() => {
    if (searchQuery.orderNum === "") {
      delete searchQuery.orderNum;
    }
    const params = new URLSearchParams(searchQuery);
    const queryString = params.toString();

    navigate("?" + queryString);
  }, [searchQuery]);

  const openEditForm = (order) => {
    setOpen(true);
    // setSelectedOrder(order);
  };

  const handlePageClick = ({ selected }) => {
    setSearchQuery({ ...searchQuery, page: selected + 1 });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getOrderCountByStatus = (status) => {
    return orderList.filter((order) => order.status === status).length;
  };
  return (
    <div className="locate-center">
      <Container className="container-custom">
        <div className="mt-2 display-center mb-2">
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="오더번호"
            field="orderNum"
          />
        </div>

        <Row className="overflow-x">
          {Object.keys(badgeBg).map((status) => (
            <DashBoardCard
              key={status}
              status={status}
              count={getOrderCountByStatus(status)}
              borderColor={badgeBg[status]}
            />
          ))}
        </Row>

        <OrderTable
          header={tableHeader}
          data={orderList}
          openEditForm={openEditForm}
          badgeBg={badgeBg}
        />
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          // pageCount={totalPageNum}
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

      {open && (
        <OrderDetailDialog
          open={open}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default AdminOrderPage;
