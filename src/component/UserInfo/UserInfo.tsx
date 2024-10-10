import React from "react";
import { User } from "../../types";

interface UserInfoProps {
  onButtonClick: (value: string) => void;
  user: User;
}

const UserInfo = ({ onButtonClick, user }: UserInfoProps) => {
  const handleButtonClick = (value: string) => {
    onButtonClick(value);
  };

  return (
    <>
      <div className="flex justify-center bg-white p-4 my-2 mx-auto rounded-xl w-full h-12 border border-gray-300">
        <p className="text-base">
          반가워요! <strong>{user?.name}</strong>님
        </p>
        <div className="inline ml-2">
          <span
            className={`text-sm border rounded-lg px-2 py-1 text-white ${
              user?.level === "customer"
                ? "bg-blue-400 border-blue-400"
                : "bg-green-500 border-green-500"
            }`}
          >
            {user?.level}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center bg-white mx-auto p-4 rounded-xl border border-gray-300 w-full">
        <div className="w-11/12 pb-4 border-b border-gray-300">
          <p className="text-lg font-semibold">쇼핑</p>
          <p
            className="cursor-pointer py-1 px-2 hover:underline rounded-lg"
            onClick={() => handleButtonClick("내 주문")}
          >
            내 주문
          </p>
          <p
            className="cursor-pointer py-1 px-2 hover:underline rounded-lg"
            onClick={() => handleButtonClick("장보기 메모")}
          >
            장보기 메모
          </p>
        </div>
        <div className="w-11/12 pt-4">
          <p className="text-lg font-semibold">나의정보</p>
          <p
            className="cursor-pointer py-1 px-2 hover:underline rounded-lg"
            onClick={() => handleButtonClick("내 레시피")}
          >
            내 레시피
          </p>
          <p
            className="cursor-pointer py-1 px-2 hover:underline rounded-lg"
            onClick={() => handleButtonClick("회원정보 수정")}
          >
            회원정보 수정
          </p>
          <p
            className="cursor-pointer py-1 px-2 hover:underline rounded-lg"
            onClick={() => handleButtonClick("비밀번호 수정")}
          >
            비밀번호 수정
          </p>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
