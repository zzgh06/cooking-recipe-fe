import React, { useCallback, useEffect, useRef, useState } from "react";
import "../../style/addressInput.style.css";
import DaumPostcodeEmbed from "react-daum-postcode";

const AddressInput = ({ setAddress }) => {
  return (
    <div>
      <div className="address-change-container">
        <button className="change-button">지역 선택 {"▾"}</button>
        <div>수도권과 부산은 하루배송 가능 지역입니다.</div>
      </div>
      <DaumPostcodeEmbed />
    </div>
  );
};

export default AddressInput;
