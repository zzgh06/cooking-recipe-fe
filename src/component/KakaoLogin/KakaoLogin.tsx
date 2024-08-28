import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLoginWithKakao } from "../../hooks/User/useLoginWithKakao";
import { useLoginWithToken } from "../../hooks/User/useLoginWithToken";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";

interface KakaoLoginProps {
  onSuccess : () => void;
  onError : (error: unknown) => void;
}

declare global {
  interface Window {
    Kakao: any;
  }
}

const KakaoLogin = ({ onSuccess, onError }: KakaoLoginProps) => {
  const navigate = useNavigate();
  const KAKAO_JAVASCRIPT_KEY = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY;

  const { mutate: loginWithKakao } = useLoginWithKakao();
  const { mutate: fetchUser } = useLoginWithToken();

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JAVASCRIPT_KEY);
    }
  }, [KAKAO_JAVASCRIPT_KEY]);

  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      success: async (authObj: { access_token: string }) => {
        try {
          const idToken = authObj.access_token;
          await loginWithKakao(idToken);
          fetchUser();
          navigate("/");
          onSuccess();
        } catch (err) {
          console.error(err);
          onError(err);
        }
      },
      fail: function (err: unknown) {
        console.error(err);
        onError(err);
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
