import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { currencyFormat } from "../../utils/number";
import { Box, Typography, Button } from "@mui/material";

const OrderReceipt = ({ selectedCartItems, totalPrice }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        p: 3,
        border: "1px solid",
        borderColor: "grey.300",
        borderRadius: 1,
        boxShadow: 1,
        width: "100%",
        maxWidth: 600,
        mx: "auto",
      }}
    >
      <Typography variant="h6" gutterBottom>
        주문 내역
      </Typography>
      <Box
        sx={{
          mb: 2,
          borderColor: "grey.300",
          pb: 2,
        }}
      >
        {selectedCartItems?.length > 0 ? (
          selectedCartItems.map((item, index) => (
            <Box
              key={item?.ingredientId?.name + index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                py: 1,
              }}
            >
              <Typography variant="body1">
                {item?.ingredientId?.name} x {item?.qty}
              </Typography>
              <Typography variant="body1">
                ₩ {currencyFormat(item?.ingredientId?.price * item?.qty)}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            장바구니에 항목이 없습니다.
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: 2,
          borderTop: "1px solid",
          borderColor: "grey.300",
          mt: 2,
        }}
      >
        <Typography variant="body1" fontWeight="bold">
          Total:
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          ₩ {currencyFormat(totalPrice)}
        </Typography>
      </Box>
      {location.pathname.includes("/cart") && selectedCartItems?.length > 0 && (
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/payment")}
          disabled={selectedCartItems?.length === 0}
          fullWidth
          sx={{ mt: 2 }}
        >
          결제하기
        </Button>
      )}
      <Box sx={{ mt: 2, typography: "body2", color: "textSecondary" }}>
        <Typography>
          가능한 결제 수단 귀하가 결제 단계에 도달할 때까지 가격 및 배송료는
          확인되지 않습니다.
        </Typography>
        <Typography>
          30일의 반품 가능 기간, 반품 수수료 및 미수취시 발생하는 추가 배송 요금
          읽어보기 반품 및 환불
        </Typography>
      </Box>
    </Box>
  );
};

export default OrderReceipt;
