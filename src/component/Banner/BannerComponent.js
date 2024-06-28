import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../style/BannerComponent.style.css";
import { responsive } from "../../constants/responsive";

const BannerComponent = ({images}) => {

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
        {images.map((item, index) => (
          <img key={index} className="banner" src={item} alt={`banner-${index}`} />
        ))}
      </Carousel>
    </div>
  );
};

export default BannerComponent;
