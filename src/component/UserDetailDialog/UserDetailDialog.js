import React from "react";
import { Button, Modal } from "react-bootstrap";

const UserDetailDialog = ({ open, handleClose, user }) => {
  return (
    <Modal show={open} onHide={handleClose} dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>User Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>아이디: {user.id}</p>
        <p>이름: {user.name}</p>
        <p>이메일: {user.email}</p>
        <p>등급: {user.level}</p>
        <p>주소: {user.shipTo}</p>
        <p>연락처: {user.contact}</p>

        <div className="order-button-area">
          <Button
            variant="light"
            onClick={handleClose}
            className="order-button"
          >
            닫기
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UserDetailDialog;
