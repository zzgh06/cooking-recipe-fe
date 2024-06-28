import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../component/UserInfo/UserInfo';
import MyOrderComponent from '../component/MyOrderComponent/MyOrderComponent';
import MyProfileEditComponent from '../component/MyProfileEditComponent/MyProfileEditComponent';
import MyRecipeComponent from '../component/MyRecipeComponent/MyRecipeComponent';
import '../style/myprofile.style.css';

const MyProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('내 주문');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return <div>Loading...</div>; 
  }

  const handleButtonClick = (value) => {
    setCurrentView(value);
  };

  const renderComponent = () => {
    switch (currentView) {
      case '내 레시피':
        return <MyRecipeComponent />;
      case '내 주문':
        return <MyOrderComponent />;
      case '프로필수정':
        return <MyProfileEditComponent />;
      default:
        return <MyOrderComponent />;
    }
  };

  return (
    <Container className="custom-container">
      <Row>
        <Col lg={5} className="user-info-col">
          <UserInfo onButtonClick={handleButtonClick} />
        </Col>
        <Col lg={7}>
          {renderComponent()}
        </Col>
      </Row>
    </Container>
  );
};

export default MyProfile;
