import { Container, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <Container sx={{display: "flex", flexDirection : "column", alignItems: "center", my: "50px"}}>
      <Typography variant="h2" component="h1">404 - 페이지를 찾을 수 없습니다.</Typography>
      <Typography variant="h2" component="p">요청하신 페이지가 존재하지 않습니다.</Typography>
      <Button variant='outlined' onClick={goHome} sx={{width: "700px", my: "20px"}}>홈으로 이동</Button>
    </Container>
  );
};

export default NotFoundPage;