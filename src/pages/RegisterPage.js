import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { registerUser } from "../redux/userSlice";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    contact: "",
    shipTo: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const error = useSelector((state) => state.auth.error);

  const handleRegister = async (event) => {
    event.preventDefault();
    const { id, password, confirmPassword, name, email, contact, shipTo } =
      formData;

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    } else {
      setPasswordError("");
    }

    dispatch(registerUser({ id, password, name, email, contact, shipTo }))
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.error("Registration failed: ", err);
      });
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        회원가입
      </Typography>
      <Box
        component="form"
        onSubmit={handleRegister}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          id="id"
          label="아이디"
          placeholder="아이디를 입력해 주세요"
          variant="outlined"
          required
          onChange={handleChange}
        />
        <TextField
          id="email"
          label="이메일"
          placeholder="예: fridge@naver.com"
          variant="outlined"
          type="email"
          required
          onChange={handleChange}
        />
        <TextField
          id="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요"
          variant="outlined"
          type="password"
          required
          onChange={handleChange}
        />
        <TextField
          id="confirmPassword"
          label="비밀번호 확인"
          placeholder="비밀번호를 한 번 더 입력해 주세요"
          variant="outlined"
          type="password"
          required
          onChange={handleChange}
        />
        <TextField
          id="name"
          label="이름"
          placeholder="이름을 입력해 주세요"
          variant="outlined"
          required
          onChange={handleChange}
        />
        <TextField
          id="contact"
          label="휴대폰"
          placeholder="숫자만 입력해 주세요"
          variant="outlined"
          type="tel"
          required
          onChange={handleChange}
        />
        <TextField
          id="shipTo"
          label="주소"
          placeholder="주소를 입력해 주세요"
          variant="outlined"
          required
          onChange={handleChange}
        />
        {passwordError && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {passwordError}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {error}
          </Alert>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          회원가입
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterPage;
