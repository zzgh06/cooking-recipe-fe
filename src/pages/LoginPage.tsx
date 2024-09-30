import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import KakaoLogin from "../component/KakaoLogin/KakaoLogin";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Link as MuiLink,
  Alert,
} from "@mui/material";
import { useLoginUser } from "../hooks/User/useLoginUser";
import { useLoginWithGoogle } from "../hooks/User/useLoginWithGoogle";
import { useLoginWithToken } from "../hooks/User/useLoginWithToken";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface FormData {
  id: string;
  password: string;
}

interface LoginData {
  id: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    id: "",
    password: "",
  });
  const user = useSelector((state: RootState) => state.auth.user);
  const { mutate: fetchUser } = useLoginWithToken();
  const { mutate: loginUser } = useLoginUser();

  const {
    mutate: loginWithGoogle,
    isError: isLoginWithGoogleError,
    error: loginWithGoogleError,
  } = useLoginWithGoogle();

  useEffect(()=>{
    if(user) {
      navigate('/')
    }
  },[])

  const handleGoogleSuccess = async (response: CredentialResponse) => {
    try {
      if (response.credential) {
        await loginWithGoogle(response.credential);
        await fetchUser();
        navigate("/");
      } else {
        console.error("구글 로그인 실패: Credential이 없습니다.");
      }
    } catch (err) {
      console.error("구글 로그인 실패: ", err);
    }
  };


  const handleGoogleFailure = () => {
    console.error("구글 로그인 실패");
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    const { id, password } = formData;
    const loginData: LoginData = { id, password }; 
    await loginUser(loginData);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const error = isLoginWithGoogleError
  const errorMessage =
    loginWithGoogleError?.message

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
            {errorMessage}
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
          />
        </Box>
        <Box>
          <KakaoLogin />
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;