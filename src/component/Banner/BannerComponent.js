import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../style/BannerComponent.style.css";
import { responsive } from "../../constants/responsive";

const optimizeImageUrl = (url) => {
  return url?.replace(/\/upload\//, "/upload/f_webp/");
};

const BannerComponent = ({ images }) => {
  const optimizedImageUrl = images.map((img) => optimizeImageUrl(img));

  const CustomLeftArrow = ({ onClick }) => (
    <button className="custom-arrow left" onClick={onClick}>
      ◀
    </button>
  );

  const CustomRightArrow = ({ onClick }) => (
    <button className="custom-arrow right" onClick={onClick}>
      ▶
    </button>
  );

  return (
    <div className="carousel-wrapper">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        containerClass="carousel-container"
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
        {optimizedImageUrl.map((item, index) => (
          <img
            key={index}
            className="banner"
            src={item}
            alt={`banner-${index}`}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default BannerComponent;
