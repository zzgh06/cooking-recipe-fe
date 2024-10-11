import React, { useState } from "react";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";

interface AddressInputProps {
  setAddress: (address: string) => void;
}

const AddressInput = ({ setAddress }: AddressInputProps) => {
  const [isPostcodeOpen, setIsPostcodeOpen] = useState<boolean>(false);

  const togglePostcode = () => {
    setIsPostcodeOpen(!isPostcodeOpen);
  };

  const handleAddressSelect = (data: Address) => {
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
    <div className="relative">
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={togglePostcode}
          className="flex items-center justify-between w-[100px] text-sm p-1 border border-black rounded-[5px] text-black hover:bg-lightgreen"
        >
          지역 선택
          ▼
        </button>
        <p className="text-sm text-gray-500">
          서울과 경기도는 새벽배송 가능 지역입니다.
        </p>
      </div>
      {isPostcodeOpen && (
        <div className="absolute z-10 w-full h-[400px] shadow-lg top-full left-0 flex items-center justify-center bg-white overflow-hidden">
          <DaumPostcodeEmbed onComplete={handleAddressSelect} />
        </div>
      )}
    </div>
  );
};

export default AddressInput;