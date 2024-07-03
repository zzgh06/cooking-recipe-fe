import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { verifyCurrentPassword } from "../redux/userSlice";
import "../style/VerifyCurrentPassword.style.css";

const VerifyCurrentPassword = ({ onVerifySuccess }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector((state) => state.auth);
  const [currentPassword, setCurrentPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      onVerifySuccess();
    }
  }, [isAuthenticated, onVerifySuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(verifyCurrentPassword(currentPassword));
  };

  console.log(error?.error)
  return (
    <>
      <div className="head-container">
        <h2>나의 계정</h2>
        <p>비밀번호 변경</p>
      </div>
      <div className="verify-password_container">
        <div className="password-info_message">
          <h4>비밀번호 재확인</h4>
          <p>
            회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번
            확인해주세요.
          </p>
        </div>
        <Form className="verify-password_form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              <svg
                className="svg-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                class="icon-md"
                style={{ color: "rgb(231, 94, 94)", marginBottom: "3px" }}
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19a3 3 0 1 1-6 0M15.865 16A7.54 7.54 0 0 0 19.5 9.538C19.5 5.375 16.142 2 12 2S4.5 5.375 4.5 9.538A7.54 7.54 0 0 0 8.135 16m7.73 0h-7.73m7.73 0v3h-7.73v-3"
                ></path>
              </svg>
              {error.error}
            </div>
          )}
          <Form.Group controlId="formBasicCurrentPassword">
            <Form.Label>현재 비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="현재 비밀번호를 입력하세요"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button className="submit_btn" type="submit" disabled={loading}>
            {loading ? "인증 중..." : "비밀번호 확인"}
          </Button>
        </Form>
      </div>
    </>
  );
};

export default VerifyCurrentPassword;
