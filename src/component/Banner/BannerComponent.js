import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../style/BannerComponent.style.css";
import { responsive } from "../../constants/responsive";

const BannerComponent = () => {
  const images = [
    "https://static.wtable.co.kr/image/production/service/banner/3669/e22ab935-5afa-45a9-8562-6e386111c0f9.png",
    "https://static.wtable.co.kr/image/production/service/banner/3645/1af3729b-6042-4036-b9bc-1424a31c3965.png",
  ];


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
