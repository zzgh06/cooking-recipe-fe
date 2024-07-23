import { styled } from "@mui/material";
import React from "react";
const BannerImageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: "0 250px",
  [theme.breakpoints.down("md")]: {
    padding: "0 70px",
  },
}));

const BannerImage = styled("img")({
  width: "100%",
});
const SubBanner = ({ img }) => {
  return (
    <BannerImageContainer>
      <BannerImage src={img} alt={img} />
    </BannerImageContainer>
  );
};

export default SubBanner;
