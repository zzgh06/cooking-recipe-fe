import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../component/UserInfo/UserInfo';
import MyOrderComponent from '../component/MyOrderComponent/MyOrderComponent';
import MyProfileEditComponent from '../component/MyProfileEditComponent/MyProfileEditComponent';
import MyRecipeComponent from '../component/MyRecipeComponent/MyRecipeComponent';
import VerifyCurrentPassword from './VerifyCurrentPassword';
import ChangePasswordPage from './ChangePasswordPage';
import { loginWithToken } from '../redux/userSlice';
import { styled } from '@mui/system';

const CustomContainer = styled(Container)({
  width: '100%',
  maxWidth: '1200px',
  margin: '50px auto',
});

const UserInfoCol = styled(Grid)({
  '&.MuiGrid-item': {
    '@media (min-width: 0px)': {
      maxWidth: '100%',
    },
    '@media (min-width: 1280px)': {
      maxWidth: '33.333333%',
    },
  },
});

const MyProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('내 주문');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    dispatch(loginWithToken());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleButtonClick = (value) => {
    setCurrentView(value);
    setIsVerified(false);
  };

  const handleVerificationSuccess = () => {
    setIsVerified(true);
  };

  const renderComponent = () => {
    switch (currentView) {
      case '내 레시피':
        return <MyRecipeComponent />;
      case '내 주문':
        return <MyOrderComponent />;
      case '회원정보 수정':
        return <MyProfileEditComponent />;
      case '비밀번호 수정':
        return isVerified ? <ChangePasswordPage /> : <VerifyCurrentPassword onVerifySuccess={handleVerificationSuccess} />;
      default:
        return <MyOrderComponent />;
    }
  };

  return (
    <CustomContainer>
      <Grid container spacing={3}>
        <UserInfoCol item xs={12} lg={3}>
          <UserInfo onButtonClick={handleButtonClick} />
        </UserInfoCol>
        <Grid item xs={12} lg={9}>
          {renderComponent()}
        </Grid>
      </Grid>
    </CustomContainer>
  );
};

export default MyProfile;
