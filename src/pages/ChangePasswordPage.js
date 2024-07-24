import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { styled } from "@mui/system";
import "../style/ChangePasswordPage.style.css";
import { useChangePassword } from "../hooks/User/useChangePassword";
import { logout, setChangePasswordError, setChangePasswordLoading } from "../redux/userSlice";

const HeadContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "baseline",
  borderBottom: "4px solid black",
  paddingLeft: "10px",
});

const ChangePasswordContainer = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const ErrorMessage = styled("div")({
  display: "flex",
  alignItems: "center",
  paddingTop: "15px",
});

const SubmitBtn = styled(Button)({
  marginTop: "16px",
  width: "100%",
});

const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gapMessage, setGapMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate: changePassword } = useChangePassword();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword.includes(" ")) {
      setGapMessage("비밀번호에는 공백을 포함할 수 없습니다.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    dispatch(setChangePasswordLoading(true));
    changePassword(newPassword, {
      onSuccess: () => {
        dispatch(setChangePasswordLoading(false));
        dispatch(setChangePasswordError(null));
        dispatch(logout());
        navigate("/login");
      },
      onError: (error) => {
        dispatch(setChangePasswordLoading(false));
        dispatch(setChangePasswordError(error.error));
      },
    });
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <HeadContainer>
        <Typography variant="h5">나의 정보</Typography>
        <Typography variant="subtitle1">비밀번호 변경</Typography>
      </HeadContainer>
      <ChangePasswordContainer>
        {gapMessage && (
          <ErrorMessage>
            <svg
              className="svg_icon"
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
            {gapMessage}
          </ErrorMessage>
        )}
        <form className="reset-password-form" onSubmit={handleSubmit}>
          {error && (
            <ErrorMessage>
              <svg
                className="svg_icon"
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
              {error}
            </ErrorMessage>
          )}
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Typography sx={{mb: 1}}>새 비밀번호</Typography>
              <TextField
                id="newPassword"
                label="새 비밀번호"
                type={showPassword ? "text" : "password"}
                fullWidth
                variant="outlined"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                onFocus={() => {
                  setErrorMessage("");
                  setGapMessage("");
                }}
                InputProps={{
                  endAdornment: (
                    <span
                      className="password-toggle-icon"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEye : faEyeSlash}
                      />
                    </span>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{mb: 1}}>새 비밀번호 재확인</Typography>
              <TextField
                id="confirmPassword"
                label="새 비밀번호 재확인"
                type={showConfirmPassword ? "text" : "password"}
                fullWidth
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                onFocus={() => {
                  setErrorMessage("");
                  setGapMessage("");
                }}
                error={!!errorMessage}
                helperText={errorMessage}
                InputProps={{
                  endAdornment: (
                    <span
                      className="password-toggle-icon"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      <FontAwesomeIcon
                        icon={showConfirmPassword ? faEye : faEyeSlash}
                      />
                    </span>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <SubmitBtn
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "변경 중..." : "비밀번호 재설정"}
              </SubmitBtn>
            </Grid>
          </Grid>
        </form>
      </ChangePasswordContainer>
    </>
  );
};

export default ChangePasswordPage;
