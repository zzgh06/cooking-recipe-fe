import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../redux/orderSlice";
import OrderStatusCard from "../OrderStatusCard/OrderStatusCard";
import "./MyOrderComponent.style.css";
import { useNavigate } from "react-router";

const MyOrderComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderList, loading, error } = useSelector((state) => state.order);
  const user = useSelector((state) => state.auth.user);
  console.log(orderList);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getOrder());
    }
  }, [dispatch, user, navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
      {orderList?.length === 0 ? (
        <div className="no-order-box">
          <div>진행중인 주문이 없습니다.</div>
        </div>
      ) : (
        <>
          {orderList.map((order) => (
            <OrderStatusCard orderItem={order} key={order._id} />
          ))}
        </>
      )}
    </Container>
  );
};

export default MyOrderComponent;
