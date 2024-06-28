import React from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const OrderCompletePage = () => {
  const { orderNum } = useSelector((state) => state.order);
  return (
    <Container className="confirmation-page">
      <img
        src="/image/greenCheck.png"
        width={100}
        className="check-image"
        alt="greeenCheck.png"
      />
      <h2>예약이 완료됐습니다!</h2>
      <div>예약번호:{orderNum}</div>
      <div>
        예약 확인은 내 예약 메뉴에서 확인해주세요
        <div className="text-align-center">
          <Link to={"/account/purchase"}>내 예약 바로가기</Link>
        </div>
      </div>
    </Container>
  );
};

export default OrderCompletePage;
