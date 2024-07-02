import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../redux/userSlice";
import "../style/ResetPasswordPage.style.css"

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user, error, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [gapMessage, setGapMessage] = useState("");
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호에 공백이 있는지 확인
    if (password.includes(" ")) {
      setGapMessage("비밀번호에는 공백을 포함할 수 없습니다.");
      return;
    }

    // 비밀번호 유효성 검사
    // if (!passwordRegex.test(password)) {
    //   setGapMessage(
    //     "비밀번호는 최소 8자 이상, 하나의 대문자, 소문자, 숫자 및 특수문자를 포함해야 합니다."
    //   );
    //   return;
    // }

    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    await dispatch(resetPassword({ password, token }));
    navigate('/login')
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <Container className="reset_password_area">
      <h2 className="title">비밀번호 재설정</h2>
      {gapMessage && (
        <span className="gap_message">
          {" "}
          <svg
            className="svg_icon"
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
          {gapMessage}
        </span>
      )}
      <Form className="reset_password_form" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicPassword" className="form_group_1">
          <Form.Label>새 비밀번호</Form.Label>
          <div className="password_input_wrap">
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="새 비밀번호를 입력해 주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              onFocus={() => {
                setErrorMessage("");
                setGapMessage("");
              }}
            />
            <span
              className="password_toggle_icon"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </span>
          </div>
        </Form.Group>
        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>새 비밀번호 재확인</Form.Label>
          <div className="password_input_wrap">
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              placeholder="새 비밀번호를 다시 입력해 주세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              isInvalid={!!errorMessage}
              onFocus={() => {
                setErrorMessage("");
                setGapMessage("");
              }}
            />
            <span
              className="password_toggle_icon"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </span>
            <Form.Control.Feedback type="invalid">
              {errorMessage}
            </Form.Control.Feedback>
          </div>
        </Form.Group>
        <button className="submit_btn" type="submit">
          비밀번호 재설정
        </button>
      </Form>
    </Container>
  );
};

export default ResetPasswordPage;
