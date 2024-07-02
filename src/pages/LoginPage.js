import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  loginUser,
  loginWithGoogle,
  loginWithToken,
  setError,
} from "../redux/userSlice";
import { GoogleLogin } from "@react-oauth/google";
import "../style/LoginPage.style.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  const error = useSelector((state) => state.auth.error);

  const handleGoogleSuccess = async (response) => {
    try {
      await dispatch(loginWithGoogle(response.credential)).unwrap();
      console.log("구글 로그인 성공");
      await dispatch(loginWithToken()).unwrap();
      navigate("/");
    } catch (err) {
      console.error("구글 로그인 실패: ", err);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("구글 로그인 실패: ", error);
    dispatch(setError("구글 로그인에 실패했습니다. 다시 시도해 주세요."));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const { id, password } = formData;
    try {
      await dispatch(loginUser({ id, password })).unwrap();
      console.log("로그인 성공");
      await dispatch(loginWithToken()).unwrap();
      navigate("/");
    } catch (error) {
      console.error("로그인 실패: ", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="login-container">
      <div className="head-container">
        <h2>로그인</h2>
      </div>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="id">
            아이디 <span className="span-start">*</span>
          </label>
          <input
            type="text"
            id="id"
            name="id"
            placeholder="아이디를 입력해 주세요"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            비밀번호 <span className="span-start">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호를 입력해 주세요"
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">로그인</button>
      </form>
      <div className="find-user">
        <div className="find-id">
          <Link to="/find-id">아이디 찾기</Link>{" "}
        </div>
        <div className="find-password">
          <Link to="/find-password">비밀번호 찾기</Link>{" "}
        </div>
      </div>
      <div className="googleLogin">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
        />
      </div>
    </div>
  );
};

export default LoginPage;
