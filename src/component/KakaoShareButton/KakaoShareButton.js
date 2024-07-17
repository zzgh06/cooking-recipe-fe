import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import { Box } from "@mui/material";

const KAKAO_JAVASCRIPT_KEY = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY;

const initializeKakao = () => {
  if (window.Kakao && !window.Kakao.isInitialized()) {
    console.log("Initializing Kakao SDK...");
    window.Kakao.init(KAKAO_JAVASCRIPT_KEY);
  }
};

const KakaoShareButton = ({ recipeDetail }) => {
  useEffect(() => {
    initializeKakao();
  }, []);

  const shareToKakao = () => {
    if (window.Kakao) {
      console.log("window.Kakao:", window.Kakao);
      console.log("recipeDetail:", recipeDetail);
      console.log("Current URL:", window.location.href);

      try {
        window.Kakao.Share.sendCustom({
          templateId: 109930,
          templateArgs: {
            title: recipeDetail?.name,
            description: recipeDetail?.description,
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        });
      } catch (error) {
        console.error("카카오 공유 오류:", error);
      }
    } else {
      console.error("Kakao SDK를 찾을 수 없습니다.");
    }
  };

  return (
    <Box onClick={shareToKakao} sx={{ cursor: "pointer" }}>
      <FontAwesomeIcon icon={faShareFromSquare} size="lg" />
    </Box>
  );
};

export default KakaoShareButton;
