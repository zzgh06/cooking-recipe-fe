import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../component/UserInfo/UserInfo';
import OrderPage from '../component/OrderPage/OrderPage';
import ProfileEditPage from '../component/ProfileEditPage/ProfileEditPage';
import '../style/myprofile.style.css';

const MyProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [showProfileEdit, setShowProfileEdit] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login'); // 로그인되지 않은 경우 로그인 페이지로 리디렉션
    }
  }, [user, navigate]);

  if (!user) {
    return <div>Loading...</div>; // 리디렉션 중에는 로딩 메시지를 표시
  }

  const handleEditProfile = () => {
    setShowProfileEdit(true);
  };

  return (
    <Container className="custom-container">
      <Row >
        <Col lg={4} className="user-info-col">
          <UserInfo user={user} onEditProfile={handleEditProfile}/>
        </Col>
        <Col lg={8}>
          {showProfileEdit ? <ProfileEditPage /> : <OrderPage />}
        </Col>
      </Row>
    </Container>
  );
};

export default MyProfile;
