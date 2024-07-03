import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const UserInfo = ({ onButtonClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);


  const handleButtonClick = (value) => {
    onButtonClick(value);
  };

  return (
    <>
      <div className="user-info">
        <span>반가와요!<strong>{user?.user.name}</strong>님</span>
      </div>
      <div className="user-info-menu">
        <div className="shopping-menu">
          <p>쇼핑</p>
          <div onClick={()=>handleButtonClick("내 주문")}>내 주문</div>
          <div>상품후기</div>
          <div>상품문의</div>
        </div>
        <div className="shopping-menu">
          <p>나의정보</p>
          <div onClick={()=>handleButtonClick("내 레시피")}>내 레시피</div>
          <div onClick={()=>handleButtonClick("회원정보 수정")}>회원정보 수정</div>
          <div onClick={()=>handleButtonClick("비밀번호 수정")}>비밀번호 수정</div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
