import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import "./OrderStatusCard.style.css"; // 스타일링을 위한 CSS 파일 추가


const badgeBg = {
  "Pending": "warning",
  "Processing": "info",
  "Completed": "success",
  "Cancelled": "danger",
  "Unknown": "secondary"
};

const OrderStatusCard = ({ orderItem }) => {
  console.log("orderItem",orderItem)

  const orderNum = orderItem.orderNum || "N/A";
  const createdAt = orderItem.createdAt ? orderItem.createdAt.slice(0, 10) : "N/A";
  const ingredientName = orderItem.items?.[0]?.ingredientId?.name || "Unknown product";
  const totalPrice = orderItem.totalPrice ? orderItem.totalPrice : "0";
  const status = orderItem.status || "Unknown";

  return (
    <div className="status-card">
      <Row>
        <Col xs={2}>
          <img
            src={orderItem.items[0]?.ingredientId?.image}
            alt={ingredientName}
            height={96}
          />
        </Col>
        <Col xs={8} className="order-info">
          <div>
            <strong>주문번호: {orderNum}</strong>
          </div>
          <div className="text-12">{createdAt}</div>
          <div>
            {ingredientName}
            {orderItem.items.length > 1 && ` 외 ${orderItem.items.length - 1}개`}
          </div>
          <div>{totalPrice}</div>
        </Col>
        <Col xs={2} className="vertical-middle">
          <div className="text-align-center text-12">주문상태</div>
          <Badge bg={badgeBg[status]}>{status}</Badge>
        </Col>
      </Row>
    </div>
  );
};

export default OrderStatusCard;
