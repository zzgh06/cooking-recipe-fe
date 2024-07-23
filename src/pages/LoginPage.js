import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import KakaoLogin from "../component/KakaoLogin/KakaoLogin";
import {
  loginUser,
  loginWithGoogle,
  loginWithKakao,
  loginWithToken,
  setError,
} from "../redux/userSlice";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Link as MuiLink,
  Alert,
} from "@mui/material";

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

  const handleKakaoLogin = async (kakaoData) => {
    try {
      await dispatch(loginWithKakao(kakaoData));
      await dispatch(loginWithToken()).unwrap();
      navigate("/");
    } catch (err) {
      console.error("카카오 로그인 실패: ", err);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const { id, password } = formData;
    try {
      await dispatch(loginUser({ id, password })).unwrap();
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
    <Container
      maxWidth="xs"
      sx={{ mt: 4, p: 3, borderRadius: 1, backgroundColor: "#fff" }}
    >
      <Box
        sx={{
          textAlign: "center",
          mb: 3,
          borderBottom: 3,
          borderColor: "black",
        }}
      >
        <Typography variant="h4" component="h2" sx={{ p: 1 }}>
          로그인
        </Typography>
      </Box>
      <form onSubmit={handleLogin}>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="아이디"
            name="id"
            placeholder="아이디를 입력해 주세요"
            onChange={handleChange}
            required
            variant="outlined"
            size="small"
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            type="password"
            label="비밀번호"
            name="password"
            placeholder="비밀번호를 입력해 주세요"
            onChange={handleChange}
            required
            variant="outlined"
            size="small"
          />
        </Box>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="success"
          sx={{ mb: 2 }}
        >
          로그인
        </Button>
      </form>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
        }}
      >
        <MuiLink
          component={Link}
          to="/find-id"
          sx={{
            pr: 2,
            borderRight: 2,
            borderColor: "black",
            textDecoration: "none",
            color: "black",
          }}
        >
          아이디 찾기
        </MuiLink>
        <MuiLink
          component={Link}
          to="/find-password"
          sx={{ pl: 2, textDecoration: "none", color: "black" }}
        >
          비밀번호 찾기
        </MuiLink>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            render={(renderProps) => (
              <Button
                onClick={renderProps.onClick}
                variant="outlined"
                color="primary"
              >
                구글 로그인
              </Button>
            )}
          />
        </Box>
        <Box>
          <KakaoLogin
            onSuccess={handleKakaoLogin}
            onError={() => {
              console.log("카카오 로그인 실패");
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
