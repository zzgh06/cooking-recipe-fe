import React from "react";
import { Box, Typography, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Instagram, Facebook, Twitter, YouTube } from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: "30px 0",
        borderTop: "1px solid lightgrey",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          marginBottom: isSmallScreen ? "15px" : "30px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <IconButton>
          <Instagram />
        </IconButton>
        <IconButton>
          <Facebook />
        </IconButton>
        <IconButton>
          <Twitter />
        </IconButton>
        <IconButton>
          <YouTube />
        </IconButton>
      </Box>
      <Typography
        variant="body2"
        sx={{
          margin: "0 auto",
          width: isSmallScreen ? "100%" : "534px",
          textAlign: "center",
          mb: "16px",
        }}
      >
        주식회사 : 냉장고에 뭐 있어?
      </Typography>
      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          color: "#999",
        }}
      >
        &copy; 2024 What’s in your fridge. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
