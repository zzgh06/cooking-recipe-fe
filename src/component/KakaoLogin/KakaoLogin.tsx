import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLoginWithKakao } from "../../hooks/User/useLoginWithKakao";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

declare global {
  interface Window {
    Kakao: any;
  }
}

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
      success: async (authObj: { access_token: string }) => {
        try {
          const idToken = authObj.access_token;
          await loginWithKakao(idToken);
          navigate("/");
        } catch (err) {
          console.error(err);
        }
      },
      fail: function (err: unknown) {
        console.error(err);
      },
    });
  };

  return (
    <button
      onClick={handleKakaoLogin}
      className="flex items-center px-3 py-2 border border-yellow-400 text-yellow-500 rounded-md hover:bg-yellow-400 hover:text-white transition duration-300"
    >
      <FontAwesomeIcon icon={faComment} className="mr-2" />
      카카오 로그인
    </button>
  );
};

export default KakaoLogin;
