import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { responsive } from "../../constants/responsive";

const optimizeImageUrl = (url : string): string => {
  return url?.replace(/\/upload\//, "/upload/f_webp/");
};

interface BannerComponentProps {
  images: string[];
}

const BannerComponent = ({ images }: BannerComponentProps) => {
  const optimizedImageUrl = images.map((img) => optimizeImageUrl(img));

  interface ArrowProps {
    onClick?: () => void;
  }

  const CustomLeftArrow = ({ onClick }: ArrowProps) => (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '10px',
        transform: 'translateY(-50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        color: 'white',
        fontSize: '20px',
        zIndex: 2,
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        },
      }}
    >
      <ArrowBack />
    </IconButton>
  );

  const CustomRightArrow = ({ onClick }:ArrowProps) => (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        right: '10px',
        transform: 'translateY(-50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        color: 'white',
        fontSize: '20px',
        zIndex: 2,
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        },
      }}
    >
      <ArrowForward />
    </IconButton>
  );

  return (
    <Box sx={{ position: 'relative', width: '100%', height: 'auto' }}>
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        containerClass="carousel-container"
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
        {optimizedImageUrl.map((item, index) => (
          <Box
            key={index}
            sx={{ width: '100%', height: 'auto' }}
          >
            <img
              src={item}
              alt={`banner-${index}`}
              style={{ width: '100%', height: 'auto' }}
              fetchPriority="high"
            />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default BannerComponent;