import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { getOrderList } from "../../redux/orderSlice"; // Import the getOrderList action
import OrderStatusCard from "../OrderStatusCard/OrderStatusCard";
import "./MyOrderComponent.style.css";
import { useNavigate } from "react-router";

const MyOrderComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderList, totalPageNum, loading, error } = useSelector((state) => state.order); // orderList와 totalPageNum 가져오기
  const [currentPage, setCurrentPage] = useState(1);
  const user = useSelector(state => state.auth.user);

  console.log("user", user);
  console.log("orders", orderList.data);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getOrderList({ userId: user.user._id, page: currentPage }));
    }
  }, [dispatch, user, currentPage, navigate]);

  const handlePageChange = (data) => {
    setCurrentPage(data.selected + 1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
      {orderList.data.length === 0 ? (
        <div className="no-order-box">
          <div>진행중인 주문이 없습니다.</div>
        </div>
      ) : (
        <>
          {orderList.data.map((order) => (
            <OrderStatusCard orderItem={order} key={order._id} />
          ))}
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageChange}
            pageRangeDisplayed={5}
            pageCount={totalPageNum}
            forcePage={currentPage - 1}
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
        </>
      )}
    </Container>
  );
};

export default MyOrderComponent;
