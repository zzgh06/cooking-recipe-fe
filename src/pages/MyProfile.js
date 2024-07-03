import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../component/UserInfo/UserInfo';
import MyOrderComponent from '../component/MyOrderComponent/MyOrderComponent';
import MyProfileEditComponent from '../component/MyProfileEditComponent/MyProfileEditComponent';
import MyRecipeComponent from '../component/MyRecipeComponent/MyRecipeComponent';
import '../style/myprofile.style.css';
import VerifyCurrentPassword from './VerifyCurrentPassword';
import ChangePasswordPage from './ChangePasswordPage';
import { loginWithToken } from "../redux/userSlice";

const MyProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('내 주문');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

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
    <Container className="custom-container">
      <Row>
        <Col lg={3} className="user-info-col">
          <UserInfo onButtonClick={handleButtonClick} />
        </Col>
        <Col lg={9}>
          {renderComponent()}
        </Col>
      </Row>
    </Container>
  );
};

export default MyProfile;
