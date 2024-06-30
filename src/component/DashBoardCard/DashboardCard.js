import React from "react";
import { Col } from "react-bootstrap";

const DashBoardCard = ({ status, count, borderColor }) => {
  return (
    <Col lg="3" md="6" sm="12">
      <div className="dashboard-card">
        <div className="dashboard-content">
          <p>{status}</p>
          <span>{count}</span>
        </div>
      </div>
    </Col>
  );
};

export default DashBoardCard;
