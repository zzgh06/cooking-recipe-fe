import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForgotPassword } from '../hooks/User/useForgotPassword';


const FindPasswordPage = () => {
  const [email, setEmail] = useState("");
  const { mutate: forgotPassword, error, isLoading } = useForgotPassword();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword({ email });
    navigate("/");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "400px",
      }}
    >
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <Typography variant="h4" component="h2" gutterBottom>
          비밀번호 찾기
        </Typography>
        <Typography variant="h6">가입한 이메일을 입력해주세요</Typography>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "100%", mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            가입한 이메일을 입력해주세요.
            <br /> 비밀번호 재설정 링크를 통해 비밀번호를 변경합니다.
          </Typography>
          <TextField
            fullWidth
            type="email"
            label="메일 주소"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={!!error}
            helperText={error}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="success"
          disabled={isLoading}
          sx={{ width: "100%" }}
        >
          {isLoading ? "링크 전송중..." : "비밀번호 재발급"}
        </Button>
      </Box>
    </Container>
  );
};

export default FindPasswordPage;