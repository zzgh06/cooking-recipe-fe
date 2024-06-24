import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import UserInfo from '../component/UserInfo/UserInfo';
import OrderPage from '../component/OrderPage/OrderPage';
import ProfileEditPage from '../component/ProfileEditPage/ProfileEditPage';
import '../style/myprofile.style.css';

const MyProfile = () => {
  const user = useSelector((state) => state.auth.user);
  console.log("user",user)

  const [showProfileEdit, setShowProfileEdit] = useState(false);

  if (!user) {
    return <div>Loading...</div>;
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
