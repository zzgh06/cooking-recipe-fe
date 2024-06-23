import React from "react";

const SubBanner = ({ img }) => {
  return (
    <div className="banner-image">
      <img src={img} alt={img} />
    </div>
  );
};

export default SubBanner;
