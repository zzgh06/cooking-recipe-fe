import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { RecentlyViewedItem } from "../../types";

interface RecentlyViewedProps {
  recentlyViewedItems: RecentlyViewedItem[];
}

const RecentlyViewed = ({ recentlyViewedItems }: RecentlyViewedProps) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });
  };

  const optimizeImageUrl = (url: string) => {
    return url.replace(/\/upload\//, '/upload/c_fill,h_140,w_140,f_auto,q_auto,f_webp/');
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "50px",
        right: "15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100px",
        minHeight: "200px",
        maxHeight: "400px",
        color: "black",
        border: "1px solid rgb(198, 198, 198)",
        borderRadius: "5px",
        zIndex: 99,
        backgroundColor: "white",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        overflowY: "auto",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          width: "100%",
          padding: "15px 7px 0 7px",
          marginBottom: "5px",
          fontSize: "14px",
          textAlign: "center",
          color: "black",
        }}
      >
        최근 본 상품
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
          flexGrow: 1,
        }}
      >
        {recentlyViewedItems.length > 0 &&
          recentlyViewedItems.map((item) => (
            <Box
              key={item.id}
              sx={{
                width: "75px",
                height: "75px",
                border: "1px solid rgb(180, 180, 180)",
                borderRadius: "5px",
                marginBottom: "10px",
                overflow: "hidden",
              }}
            >
              <Link to={`/ingredients/${item.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                <img
                  src={optimizeImageUrl(item.images)}
                  alt={item.name}
                  style={{ width: '100%', height: '100%', borderRadius: '5px' }}
                />
              </Link>
            </Box>
          ))}
      </Box>
      <Box
        sx={{
          width: "100%",
          padding: "10px",
          textAlign: "center",
        }}
      >
        <Typography
          component="a"
          onClick={scrollToTop} 
          sx={{
            color: "black",
            textDecoration: "none",
            fontSize: "14px",
            cursor: "pointer",
            display: "inline-block",
          }}
        >
          TOP ▲
        </Typography>
      </Box>
    </Box>
  );
};

export default RecentlyViewed;