import React, { useEffect, useState } from "react";
import { Form, Modal, Button, Col, Table } from "react-bootstrap";
// import { ORDER_STATUS } from "../constants/order.constants";
import { useDispatch, useSelector } from "react-redux";
import { currencyFormat } from "../../utils/number";

const OrderDetailDialog = ({ open, handleClose, searchQuery }) => {
  const dispatch = useDispatch();
  const selectedOrder = [
    {
      orderNum: "1213132",
      createdAt: "2024년 06월 20일",
      userId: { email: "admin@gmail.com" },
      items: [{ productId: { name: "홍길동" } }],
      shipTo: { address: "경기도 안산시", city: "안산" },
      totalPrice: 30000,
      status: "preparing",
    }
  ];
  // const { selectedOrder, updateOrder, getOrderList } = useSelector(
  //   (state) => state.orders
  // );
  const [orderStatus, setOrderStatus] = useState(selectedOrder.status);

  const handleStatusChange = (event) => {
    setOrderStatus(event.target.value);
  };

  const submitStatus = async (event) => {
    event.preventDefault();
    // await dispatch(updateOrder(selectedOrder._id, orderStatus));
    // await dispatch(getOrderList(searchQuery));
    handleClose();
  };

  if (!selectedOrder) {
    return <></>;
  }
  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Order Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>예약번호: {selectedOrder[0].orderNum}</p>
        <p>주문날짜: {selectedOrder[0].createdAt.slice(0, 10)}</p>
        <p>이메일: {selectedOrder[0].userId.email}</p>
        <p>
          주소:{selectedOrder[0].shipTo.address + " " + selectedOrder[0].shipTo.city}
        </p>
        <p>
          연락처:
          {/* {`${selectedOrder[0].contact.contact}`} */}
        </p>
        <p>주문내역</p>
        <div className="overflow-x">
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Unit Price</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder[0].items.length > 0 &&
                selectedOrder[0].items.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.productId.name}</td>
                    <td>{currencyFormat(item.price)}</td>
                    <td>{item.qty}</td>
                    <td>{currencyFormat(item.price * item.qty)}</td>
                  </tr>
                ))}
              <tr>
                <td colSpan={4}>총계:</td>
                <td>{currencyFormat(selectedOrder[0].totalPrice)}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <Form onSubmit={submitStatus}>
          <Form.Group as={Col} controlId="status">
            <Form.Label>Status</Form.Label>
            {/* <Form.Select value={orderStatus} onChange={handleStatusChange}>
              {ORDER_STATUS.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </Form.Select> */}
          </Form.Group>
          <div className="order-button-area">
            <Button
              variant="light"
              onClick={handleClose}
              className="order-button"
            >
              닫기
            </Button>
            <Button type="submit">저장</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default OrderDetailDialog;
