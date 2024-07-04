import React from "react";
import { Typography, Grid, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

const UserInfoContainer = styled("div")({
  display: "flex",
  backgroundColor: "#fff",
  padding: "15px",
  margin: "10px auto",
  borderRadius: "15px",
  width: "100%",
  height: "50px",
  border: "1px solid lightgray",
});

const UserInfoMenu = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff",
  margin: "0 auto",
  padding: "15px",
  borderRadius: "15px",
  border: "1px solid lightgray",
  width: "100%",
});

const ShoppingMenu = styled("div")({
  width: "90%",
  padding: "5px 0 15px",
  borderBottom: "1px solid lightgray",
});

const UserInfo = ({ onButtonClick }) => {
  const user = useSelector((state) => state.auth.user);

  const handleButtonClick = (value) => {
    onButtonClick(value);
  };

  return (
    <>
      <UserInfoContainer>
        <Typography variant="body1">
          반가워요! <strong>{user?.user.name}</strong>님
        </Typography>
        <Box display="inline" ml={1}>
          <Typography
            variant="subtitle2"
            border={1}
            borderRadius={2}
            borderColor="primary.light"
            bgcolor="primary.light"
            color="white"
            px="10px"
          >
            customer
          </Typography>
        </Box>
      </UserInfoContainer>
      <UserInfoMenu>
        <ShoppingMenu>
          <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
            쇼핑
          </Typography>
          <div onClick={() => handleButtonClick("내 주문")}>내 주문</div>
          <div>상품후기</div>
          <div>상품문의</div>
        </ShoppingMenu>
        <ShoppingMenu>
          <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
            나의정보
          </Typography>
          <div onClick={() => handleButtonClick("내 레시피")}>내 레시피</div>
          <div onClick={() => handleButtonClick("회원정보 수정")}>
            회원정보 수정
          </div>
          <div onClick={() => handleButtonClick("비밀번호 수정")}>
            비밀번호 수정
          </div>
        </ShoppingMenu>
      </UserInfoMenu>
    </>
  );
};

export default UserInfo;
