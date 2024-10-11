import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../../constants/responsive";

const optimizeImageUrl = (url: string): string => {
  return url?.replace(/\/upload\//, "/upload/f_webp/");
};

const BannerComponent = ({ images }: { images: string[] }) => {
  const optimizedImageUrl = images.map((img) => optimizeImageUrl(img));

  interface ArrowProps {
    onClick?: () => void;
  }

  const CustomLeftArrow = ({ onClick }: ArrowProps) => (
    <button
      onClick={onClick}
      className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white text-lg z-20 hover:bg-opacity-60 p-2 rounded"
    >
      ◀
    </button>
  );

  const CustomRightArrow = ({ onClick }: ArrowProps) => (
    <button
      onClick={onClick}
      className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white text-lg z-20 hover:bg-opacity-60 p-2 rounded"
    >
      ▶
    </button>
  );

  return (
    <div className="relative w-full h-auto">
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        containerClass="carousel-container"
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
        {optimizedImageUrl.map((item, index) => (
          <div key={index} className="w-full h-auto">
            <img
              src={item}
              alt={`banner-${index}`}
              className="w-full h-auto"
              fetchPriority="high"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerComponent;