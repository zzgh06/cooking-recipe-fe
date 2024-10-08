import React from "react";

interface DeliveryEstimateProps {
  address: string;
}

const DeliveryEstimate = ({ address }: DeliveryEstimateProps) => {
  const regionsFast = ["서울", "경기", "인천"];
  const regionsRegular = [
    "강원",
    "경북",
    "경남",
    "제주",
    "전남",
    "전북",
    "광주",
    "대구",
    "울산",
    "세종",
    "대전",
    "충남",
    "충북",
    "부산",
  ];

  let deliveryText = "";
  let textColorClass = "";

  if (regionsFast.some((region) => address.includes(region))) {
    deliveryText = "새벽 배송 - 20시까지 주문하면 내일 도착 예정";
    textColorClass = "text-red-500";
  } else if (regionsRegular.some((region) => address.includes(region))) {
    deliveryText = "일반 배송 - 오늘 출고 예정";
  } else {
    deliveryText = "배송 정보가 없습니다.";
  }
  return (
    <div>
      <p className={`bg-white border border-gray-300 rounded-md p-2 mt-2 text-xs ${textColorClass}`}>
        {deliveryText}
      </p>
    </div>
  );
};

export default DeliveryEstimate;