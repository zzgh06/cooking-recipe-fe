import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { currencyFormat } from "../../utils/number";

interface CartItem {
  ingredientId: {
    name: string;
    price: number | undefined;
  };
  qty: number;
}

interface OrderReceiptProps {
  selectedCartItems: CartItem[];
  totalPrice: number;
}

const OrderReceipt = ({ selectedCartItems, totalPrice }: OrderReceiptProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="p-6 border border-gray-300 rounded-lg shadow w-full max-w-[450px] mx-auto">
      <h2 className="text-lg font-semibold mb-4">주문 내역</h2>
      <div className="mb-4 pb-4">
        {selectedCartItems?.length > 0 ? (
          selectedCartItems.map((item, index) => (
            <div
              key={item?.ingredientId?.name + index}
              className="flex justify-between py-2"
            >
              <p>{item?.ingredientId?.name} x {item?.qty}</p>
              <p>₩ {currencyFormat((item?.ingredientId?.price ?? 0) * item?.qty)}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">장바구니에 항목이 없습니다.</p>
        )}
      </div>
      <div className="flex justify-between pt-4 border-t mt-4">
        <p className="font-bold">Total:</p>
        <p className="font-bold">₩ {currencyFormat(totalPrice)}</p>
      </div>
      {location.pathname.includes("/cart") && selectedCartItems?.length > 0 && (
        <button
          className="w-full bg-green-700 text-white py-2 rounded mt-4 hover:bg-green-700 disabled:opacity-50"
          onClick={() => navigate("/payment")}
          disabled={selectedCartItems?.length === 0}
        >
          결제하기
        </button>
      )}
      <div className="mt-4 text-sm text-gray-500">
        <p>
          가능한 결제 수단 귀하가 결제 단계에 도달할 때까지 가격 및 배송료는
          확인되지 않습니다.
        </p>
        <p>
          30일의 반품 가능 기간, 반품 수수료 및 미수취시 발생하는 추가 배송 요금
          읽어보기 반품 및 환불
        </p>
      </div>
    </div>
  );
};

export default OrderReceipt;
