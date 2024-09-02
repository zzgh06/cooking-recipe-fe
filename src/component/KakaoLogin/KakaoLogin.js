import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLoginWithKakao } from "../../hooks/User/useLoginWithKakao";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";

const KakaoLogin = () => {
  const navigate = useNavigate();
  const KAKAO_JAVASCRIPT_KEY = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY;

  const { mutate: loginWithKakao } = useLoginWithKakao();

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JAVASCRIPT_KEY);
    }
  }, [KAKAO_JAVASCRIPT_KEY]);

  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      success: async function (authObj) {
        try {
          const idToken = authObj.access_token;
          await loginWithKakao(idToken);
          navigate("/");
        } catch (err) {
          console.error(err);
        }
      },
      fail: function (err) {
        console.error(err);
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
