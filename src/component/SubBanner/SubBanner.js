import { styled } from "@mui/material";
import React from "react";
const BannerImage = styled('div')({
  display : 'flex',
  justifyContent: "center"
})
const SubBanner = ({ img }) => {
  return (
    <BannerImage>
      <img src={img} alt={img} />
    </BannerImage>
  );
};

export default SubBanner;
