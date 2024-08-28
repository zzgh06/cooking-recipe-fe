import React from "react";

interface DeliveryEstimateProps {
  address: string[];
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
  let deliveryStyle = {};

  if (regionsFast.some((region) => address.includes(region))) {
    deliveryText = "새벽 배송 - 20시까지 주문하면 내일 도착 예정";
    deliveryStyle = { color: "red" };
  } else if (regionsRegular.some((region) => address.includes(region))) {
    deliveryText = "일반 배송 - 오늘 출고 예정";
  } else {
    deliveryText = "배송 정보가 없습니다.";
  }
  return (
    <div>
      <p
        style={{
          ...deliveryStyle,
          backgroundColor: "white",
          border : "1px solid grey",
          borderRadius : "5px",
          padding: "10px",
          marginTop: "10px",
          fontSize: "x-small",
        }}
      >
        {deliveryText}
      </p>
    </div>
  );
};

export default DeliveryEstimate;