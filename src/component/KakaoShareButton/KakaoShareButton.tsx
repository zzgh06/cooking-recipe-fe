import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import { Box } from "@mui/material";

interface RecipeDetail {
  _id?: string;
  name?: string;
  description?: string;
}

interface KakaoShareButtonProps {
  recipeDetail: RecipeDetail;
}

declare global {
  interface Window {
    Kakao: any;
  }
}

const KakaoShareButton = ({ recipeDetail }: KakaoShareButtonProps) => {
  const KAKAO_JAVASCRIPT_KEY = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY;

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JAVASCRIPT_KEY);
    }
  }, [KAKAO_JAVASCRIPT_KEY]);

  const shareToKakao = () => {
    if (window.Kakao) {
      try {
        window.Kakao.Share.sendCustom({
          templateId: 109930,
          templateArgs: {
            title: recipeDetail?.name,
            description: recipeDetail?.description,
            id: recipeDetail?._id,
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
