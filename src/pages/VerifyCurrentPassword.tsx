import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, Typography, Grid, Box, CircularProgress, styled } from "@mui/material";
import { setVerifyPasswordLoading, setVerifyPasswordError, setIsAuthenticated } from "../redux/userSlice";
import { useVerifyCurrentPassword } from "../hooks/User/useVerifyCurrentPassword"; 
import { RootState } from "../redux/store";

const HeadContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'baseline',
  borderBottom: '4px solid black',
  paddingLeft: theme.spacing(1),
}));

interface VerifyCurrentPasswordProps {
  onVerifySuccess: () => void;
}

const VerifyCurrentPassword = ({ onVerifySuccess }: VerifyCurrentPasswordProps) => {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [currentPassword, setCurrentPassword] = useState<string>("");

  const { mutate: verifyPassword } = useVerifyCurrentPassword();

  useEffect(() => {
    if (isAuthenticated) {
      onVerifySuccess();
    }
  }, [isAuthenticated, onVerifySuccess]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setVerifyPasswordLoading(true));
    verifyPassword(currentPassword, {
      onSuccess: () => {
        dispatch(setVerifyPasswordLoading(false));
        dispatch(setIsAuthenticated(true));
        dispatch(setVerifyPasswordError(null))
        onVerifySuccess();
      },
      onError: (error: unknown) => {
        dispatch(setVerifyPasswordLoading(false));
        if (error instanceof Error) {
          dispatch(setVerifyPasswordError(error.message));
        } else {
          dispatch(setVerifyPasswordError("알 수 없는 오류가 발생했습니다.."));
        }
      },
    });
  };

  return (
    <>
      <Grid item xs={12}>
        <HeadContainer>
          <Typography variant="h5">나의 정보</Typography>
          <Typography variant="subtitle1">비밀번호 수정</Typography>
        </HeadContainer>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 4,
          px: 2,
          height: '100%',
        }}
      >
        <Box
          sx={{
            mb: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" sx={{ fontSize: '25px' }}>
            비밀번호 재확인
          </Typography>
          <Typography>
            회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인해주세요.
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
            maxWidth: '560px',
            backgroundColor: '#fff',
            boxShadow: 'none',
            borderRadius: 0,
            borderTop: '3px solid black',
            borderBottom: '2px solid black',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {error && (
            <Box
              sx={{
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                color: 'rgb(231, 94, 94)',
              }}
            >
              <Typography variant="body2" sx={{ ml: 1 }}>
                {error}
              </Typography>
            </Box>
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
                endIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {loading ? "인증 중..." : "비밀번호 확인"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default VerifyCurrentPassword;
