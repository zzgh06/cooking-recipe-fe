import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useChangePassword } from "../hooks/User/useChangePassword";
import {
  logout,
  setChangePasswordError,
  setChangePasswordLoading,
} from "../redux/userSlice";
import { RootState } from "../redux/store";

const HeadContainer = (props: any) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "baseline",
      borderBottom: "4px solid black",
      paddingLeft: (theme) => theme.spacing(1),
      mb: 3,
      textAlign: 'center'
    }}
    {...props}
  />
);

const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gapMessage, setGapMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate: changePassword } = useChangePassword();

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
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
        const errorMessage = error?.message || "비밀번호 변경 중 오류가 발생했습니다.";
        dispatch(setChangePasswordError(errorMessage));
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '450px',
            p: 3,
          }}
        >
          {gapMessage && (
            <Typography
              color="error"
              sx={{ mb: 2, display: "flex", alignItems: "center" }}
            >
              <FontAwesomeIcon
                icon={faEyeSlash}
                style={{ marginRight: "8px" }}
              />
              {gapMessage}
            </Typography>
          )}
          {error && (
            <Typography
              color="error"
              sx={{ mb: 2, display: "flex", alignItems: "center" }}
            >
              <FontAwesomeIcon
                icon={faEyeSlash}
                style={{ marginRight: "8px" }}
              />
              {error}
            </Typography>
          )}
          <TextField
            fullWidth
            variant="outlined"
            label="새 비밀번호"
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onFocus={() => {
              setErrorMessage("");
              setGapMessage("");
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="새 비밀번호 재확인"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onFocus={() => {
              setErrorMessage("");
              setGapMessage("");
            }}
            error={!!errorMessage}
            helperText={errorMessage}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleConfirmPasswordVisibility}>
                    <FontAwesomeIcon
                      icon={showConfirmPassword ? faEye : faEyeSlash}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? "변경 중..." : "비밀번호 재설정"}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ChangePasswordPage;
