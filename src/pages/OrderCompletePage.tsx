import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";

const OrderCompletePage = () => {
  const { orderNum } = useSelector((state: RootState) => state.order);

  return (
    <div className="flex flex-col items-center justify-center text-center py-[100px] bg-gray-50">
      <img
        src="/image/greenCheck.png"
        width={100}
        alt="Green Check"
        className="mb-5"
      />
      <h4 className="text-2xl font-semibold mb-2">주문이 완료됐습니다!</h4>
      <h6 className="text-xl mb-2">주문번호: {orderNum}</h6>
      <p className="text-base mb-4">주문 확인은 마이페이지에서 확인해주세요</p>
      <Link to="/account/profile">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
          내 주문 바로가기
        </button>
      </Link>
    </div>
  );
};

export default OrderCompletePage;
