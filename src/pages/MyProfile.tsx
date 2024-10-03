import React, { useState, useEffect } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserInfo from "../component/UserInfo/UserInfo";
import MyOrderComponent from "../component/MyOrderComponent/MyOrderComponent";
import MyProfileEditComponent from "../component/MyProfileEditComponent/MyProfileEditComponent";
import MyRecipeComponent from "../component/MyRecipeComponent/MyRecipeComponent";
import VerifyCurrentPassword from "./VerifyCurrentPassword";
import ChangePasswordPage from "./ChangePasswordPage";
import { styled } from "@mui/system";
import MyGroceryNote from "../component/MyGroceryNote/MyGroceryNote";
import { useLoginWithToken } from "../hooks/User/useLoginWithToken";
import { RootState } from "../redux/store";

const CustomContainer = styled(Container)({
  width: "100%",
  maxWidth: "1200px",
  margin: "50px auto",
});

const UserInfoCol = styled(Grid)({
  "&.MuiGrid-item": {
    "@media (min-width: 0px)": {
      maxWidth: "100%",
    },
    "@media (min-width: 1280px)": {
      maxWidth: "33.333333%",
    },
  },
});

const MyProfile = () => {

  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<string>("내 주문");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { mutate: fetchUser } = useLoginWithToken();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await fetchUser(); 
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchUserData();
  }, [fetchUser]);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      navigate("/login"); 
    }
  }, []);

  const handleButtonClick = (value: string) => {
    setCurrentView(value);
    setIsVerified(false);
  };

  const handleVerificationSuccess = () => {
    setIsVerified(true);
  };

  const renderComponent = () => {
    switch (currentView) {
      case "내 레시피":
        return <MyRecipeComponent />;
      case "내 주문":
        return <MyOrderComponent />;
      case "장보기 메모":
        return <MyGroceryNote />;
      case "회원정보 수정":
        return user ? <MyProfileEditComponent user={user} /> : <Typography>사용자 정보를 불러올 수 없습니다.</Typography>;
      case "비밀번호 수정":
        return isVerified ? (
          <ChangePasswordPage />
        ) : (
          <VerifyCurrentPassword onVerifySuccess={handleVerificationSuccess} />
        );
      default:
        return <MyOrderComponent />;
    }
  };

  return (
    <CustomContainer>
      <Grid container spacing={3}>
      <UserInfoCol item xs={12} lg={3}>
          {user ? (
            <UserInfo onButtonClick={handleButtonClick} user={user} />
          ) : (
            <Typography>사용자 정보를 불러올 수 없습니다.</Typography>
          )}
        </UserInfoCol>
        <Grid item xs={12} lg={9}>
          {renderComponent()}
        </Grid>
      </Grid>
    </CustomContainer>
  );
};

export default MyProfile;
