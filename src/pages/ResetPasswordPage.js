import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Container, TextField, IconButton, InputAdornment, Typography, Button, Snackbar, Alert } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useResetPassword } from "../hooks/useResetPassword";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [gapMessage, setGapMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { token } = useParams();

  const { mutate: resetPassword } = useResetPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.includes(" ")) {
      setGapMessage("비밀번호에는 공백을 포함할 수 없습니다.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    await resetPassword({ password, token });
    navigate('/login');
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
    <Container maxWidth="sm" sx={{ textAlign: 'center', padding: 4, margin: "50px auto" }}>
      <Typography variant="h4" gutterBottom>
        비밀번호 재설정
      </Typography>
      {gapMessage && (
        <Snackbar open autoHideDuration={6000} onClose={() => setGapMessage('')}>
          <Alert onClose={() => setGapMessage('')} severity="error" sx={{ width: '100%' }}>
            {gapMessage}
          </Alert>
        </Snackbar>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="새 비밀번호"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => { setErrorMessage(""); setGapMessage(""); }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="새 비밀번호 재확인"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onFocus={() => { setErrorMessage(""); setGapMessage(""); }}
          error={!!errorMessage}
          helperText={errorMessage}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          required
        />
        <Button type="submit" variant="contained" color="success" sx={{ marginTop: 3 }}>
          비밀번호 재설정
        </Button>
      </form>
    </Container>
  );
};

export default ResetPasswordPage;
