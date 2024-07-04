import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Grid, styled } from "@mui/material";
import { verifyCurrentPassword } from "../redux/userSlice";
import "../style/VerifyCurrentPassword.style.css";

const HeadContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'baseline',
  borderBottom: '4px solid black',
  paddingLeft: '10px',
});

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

  return (
    <>
      <Grid item xs={12}>
        <HeadContainer>
          <Typography variant="h4">나의 계정</Typography>
          <Typography variant="subtitle1">회원정보 수정</Typography>
        </HeadContainer>
      </Grid>
      <div className="verify-password_container">
        <div className="password-info_message">
          <Typography variant="h5" sx={{fontSize: '25px'}}>비밀번호 재확인</Typography>
          <Typography>
            회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인해주세요.
          </Typography>
        </div>
        <form onSubmit={handleSubmit} className="verify-password_form">
          {error && (
            <div className="error-message">
              <svg
                className="svg-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                style={{ color: "rgb(231, 94, 94)", marginBottom: "3px" }}
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19a3 3 0 1 1-6 0M15.865 16A7.54 7.54 0 0 0 19.5 9.538C19.5 5.375 16.142 2 12 2S4.5 5.375 4.5 9.538A7.54 7.54 0 0 0 8.135 16m7.73 0h-7.73m7.73 0v3h-7.73v-3"
                ></path>
              </svg>
              {error.error}
            </div>
          )}
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <TextField
                id="currentPassword"
                label="현재 비밀번호"
                type="password"
                fullWidth
                variant="outlined"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "인증 중..." : "비밀번호 확인"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default VerifyCurrentPassword;
