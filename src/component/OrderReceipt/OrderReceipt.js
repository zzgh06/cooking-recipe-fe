import React from "react";
import { useLocation } from "react-router-dom";
import { currencyFormat } from "../../utils/number";
import "./OrderReceipt.style.css";
import { Button } from "@mui/material";
const OrderReceipt = ({
  cartItem,
  totalPrice,
  handlePurchase,
  selectedItems,
}) => {
  const location = useLocation();
  return (
    <div className="receipt-container">
      <h3 className="receipt-title">주문 내역</h3>
      <ul className="receipt-list">
        {cartItem?.length > 0 &&
          cartItem.map((item) => (
            <li>
              <div className="receipt-display">
                <div>{item.ingredientId?.name}</div>

                <div>
                  ₩ {currencyFormat(item.ingredientId.price * item.qty)}
                </div>
              </div>
            </li>
          ))}
      </ul>
      <div className="receipt-display receipt-title">
        <div>
          <strong>Total:</strong>
        </div>
        <div>
          <strong>₩ {currencyFormat(totalPrice)}</strong>
        </div>
      </div>
      {location.pathname.includes("/cart") && cartItem?.length > 0 && (
        <Button
          variant="contained"
          color="success"
          onClick={handlePurchase}
          disabled={selectedItems.length === 0}
          fullWidth
          sx={{ mt: 2 }}
        >
          결제하기
        </Button>
      )}

      <div>
        가능한 결제 수단 귀하가 결제 단계에 도달할 때까지 가격 및 배송료는
        확인되지 않습니다.
        <div>
          30일의 반품 가능 기간, 반품 수수료 및 미수취시 발생하는 추가 배송 요금
          읽어보기 반품 및 환불
        </div>
      </div>
    </div>
  );
};

export default OrderReceipt;
