import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginWithKakao, loginWithToken } from "../../redux/userSlice";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";

const KakaoLogin = ({ onSuccess, onError }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const KAKAO_JAVASCRIPT_KEY = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY;

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JAVASCRIPT_KEY);
    }
  }, [KAKAO_JAVASCRIPT_KEY]);

  const handleKakaoLogin = async () => {
    window.Kakao.Auth.login({
      success: async function (authObj) {
        try {
          const idToken = authObj.access_token;
          await dispatch(loginWithKakao(idToken));
          await dispatch(loginWithToken()).unwrap();
          navigate("/");
          if (onSuccess) onSuccess();
        } catch (err) {
          console.error(err);
          if (onError) onError(err);
        }
      },
      fail: function (err) {
        console.error(err);
        if (onError) onError(err);
      },
    });
  };

  return (
    <Button
      variant="outlined"
      color="warning"
      onClick={handleKakaoLogin}
      startIcon={<FontAwesomeIcon icon={faComment} />}
    >
      카카오 로그인
    </Button>
  );
};

export default KakaoLogin;
