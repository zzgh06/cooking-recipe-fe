import React from "react";
import { useSelector } from "react-redux";
import { Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";

const OrderCompletePage = () => {
  const { orderNum } = useSelector((state: RootState) => state.order);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6,
        textAlign: 'center'
      }}
    >
      <img
        src="/image/greenCheck.png"
        width={100}
        alt="Green Check"
        style={{ marginBottom: 20 }}
      />
      <Typography variant="h4" gutterBottom>
        주문이 완료됐습니다!
      </Typography>
      <Typography variant="h6" gutterBottom>
        주문번호: {orderNum}
      </Typography>
      <Typography variant="body1" paragraph>
        주문 확인은 마이페이지에서 확인해주세요
      </Typography>
      <Button
        component={Link}
        to="/account/profile"
        variant="contained"
        color="primary"
      >
        내 주문 바로가기
      </Button>
    </Container>
  );
};

export default OrderCompletePage;
