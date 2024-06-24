import React, { useState } from "react";
import "../../style/addressInput.style.css";
import DaumPostcodeEmbed from "react-daum-postcode";

const AddressInput = ({ setAddress }) => {
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

  const togglePostcode = () => {
    setIsPostcodeOpen(!isPostcodeOpen);
  };

  const handleAddressSelect = (data) => {
    const fullAddress = data.address;
    const extraAddress =
      data.addressType === "R"
        ? (data.bname !== "" ? ` (${data.bname})` : "") +
          (data.buildingName !== "" ? `, ${data.buildingName}` : "")
        : "";
    setAddress(fullAddress + extraAddress);
    setIsPostcodeOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="address-change-container">
        <button className="change-button" onClick={togglePostcode}>
          지역 선택 {"▾"}
        </button>
        <div>서울과 경기도는 새벽배송 가능 지역입니다.</div>
      </div>
      {isPostcodeOpen && (
        <div style={{ position: "absolute", zIndex: 100 }}>
          <DaumPostcodeEmbed onComplete={handleAddressSelect} />
        </div>
      )}
    </div>
  );
};

export default AddressInput;
