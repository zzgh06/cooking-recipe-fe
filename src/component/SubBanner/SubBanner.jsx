import { styled } from "@mui/material";
import React from "react";

const BannerImageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: "0 130px",
  [theme.breakpoints.down("md")]: {
    padding: "0 100px",
  },
}));

const BannerImage = styled("img")({
  width: "100%",
  height: "120px",
});


const SubBanner = ({ img }) => {
  return (
    <BannerImageContainer>
      <BannerImage src={img} alt={img}/>
    </BannerImageContainer>
  );
};

export default SubBanner;
