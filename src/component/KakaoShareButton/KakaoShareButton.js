import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { Box } from '@mui/material';

const KAKAO_APP_KEY = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY;
const TEMPLATE_ID = process.env.REACT_APP_KAKAO_TEMPLATE_ID;
console.log(TEMPLATE_ID)

const initializeKakao = () => {
  if (window.Kakao && !window.Kakao.isInitialized()) {
    window.Kakao.init(KAKAO_APP_KEY);
  }
};

const KakaoShareButton = ({ recipeDetail }) => {
  useEffect(() => {
    initializeKakao();
  }, []);

  const shareToKakao = () => {
    if (window.Kakao) {
      window.Kakao.Link.sendCustom({
        templateId: 109931,
        templateArgs: {
          title: recipeDetail?.name,
          description: recipeDetail?.description,
          imageUrl: recipeDetail?.images[0],
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      });
    }
  };

  return (
    <Box onClick={shareToKakao} sx={{ cursor: 'pointer' }}>
      <FontAwesomeIcon icon={faShareFromSquare} size="lg" />
    </Box>
  );
};

export default KakaoShareButton;
