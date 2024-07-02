import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import "../style/FindPasswordPage.style.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../redux/userSlice";

const FindPasswordPage = () => {
  const [email, setEmail] = useState('');
  const { user, error, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(forgotPassword({email}));
    navigate('/')
  }
  return (
    <Container className="find_password_area">
      <div>
        <h2>비밀번호 찾기</h2>
        <p>가입한 이메일을 입력해주세요</p>
      </div>
      <Form className="find_password_form" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>
            <span className="find_password_info">
              가입한 이메일을 입력해주세요.
              <br /> 비밀번호 재설정 링크를 통해 비밀번호를 변경합니다.
            </span>
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="메일 주소"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            isInvalid={!!error}
          />
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
        <button className="submit_btn" type="submit" disabled={loading}>
          {loading ? '링크 전송중...' : '비밀번호 재발급'}
        </button>
      </Form>
    </Container>
  );
};

export default FindPasswordPage;
