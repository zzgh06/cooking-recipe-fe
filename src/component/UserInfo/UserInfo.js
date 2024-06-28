import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, Row, Col, Container } from 'react-bootstrap';
import { logout } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import './UserInfo.style.css';

const UserInfo = ({ onButtonClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  const handleButtonClick = (value) => {
    console.log(`${value} 버튼을 눌렀습니다.`);
    onButtonClick(value);
  };

  return (
    <Container className="user-info">
      <Row className="align-items-center mb-3">
        <Col xs={3}>
          <Image 
            src="https://via.placeholder.com/100" 
            roundedCircle 
            alt="User profile" 
            className="profile-image"
          />
        </Col>
        <Col xs={9}>
          <div className="d-flex flex-column align-items-end">
            <div className="d-flex justify-content-between w-100">              
              <span className="name-span"><strong>{user?.user.name}</strong> 님</span>
              <span onClick={handleLogout} style={{ cursor: 'pointer', color: 'blue' }}>로그아웃</span>
            </div>
            
            <p>ID: {user?.user.id} </p>
            <p>{user?.user.email}</p>
            <p>Phone: {user?.user.contact}</p>
            
          </div>
        </Col>
      </Row>
      <Row className="additional-info">
        <Col>
          <button className="w-105 mb-2" onClick={() => handleButtonClick('내 레시피')}>내 레시피</button>
        </Col>
        <Col>
          <button className="w-105 mb-2" onClick={() => handleButtonClick('내 주문')}>내 주문</button>
        </Col>
        <Col>
          <button className="w-105 mb-2" onClick={() => handleButtonClick('프로필수정')}>프로필수정</button>
        </Col>
      </Row>
    </Container>
  );
};

export default UserInfo;
