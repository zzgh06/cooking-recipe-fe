import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faSignal } from "@fortawesome/free-solid-svg-icons";

const RecipeCardContainer = styled("div")({
  position: "relative",
  border: "none",
  borderRadius: "8px",
  marginBottom: "10px",
  width: "100%",
  padding: "10px 15px",
  overflow: "hidden",
  transition: "all 1s ease-in-out",
});

const RecipeImage = styled("img")({
  width: "100%",
  height: "auto",
  aspectRatio: "3 / 2", 
  objectFit: "cover",
  borderRadius: "8px",
  transition: "all 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const CardDescription = styled("div")({
  padding: "10px 8px",
});

const HeadContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  color: "gray",
});

const optimizeImageUrl = (url) => {
  return url.replace(/\/upload\//, '/upload/c_fill,h_504,w_504,f_webp/');
};

const RecipeCard = ({ item }) => {
  const navigate = useNavigate();

  const showRecipe = (id) => {
    navigate(`/recipe/${id}`);
  };

  const optimizedImageUrl = optimizeImageUrl(item.images[0]);

  return (
    <RecipeCardContainer>
       <RecipeImage
        src={optimizedImageUrl}
        srcSet={`${optimizedImageUrl}?w=200 200w, ${optimizedImageUrl}?w=400 400w`}
        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={item.name}
        onClick={() => showRecipe(item._id)}
      />
      <CardDescription>
        <Typography variant="h6" align="center" sx={{ fontSize: "20px", fontWeight: "600" }}>
          {item.name}
        </Typography>
        <HeadContainer>
          <Typography variant="subtitle1" align="center" sx={{ paddingRight: "15px" }}>
            <FontAwesomeIcon icon={faSignal} /> {item.difficulty}
          </Typography>
          <Typography variant="subtitle1" align="center">
            <FontAwesomeIcon icon={faClock} /> {item.time.split("이내")[0]}
          </Typography>
        </HeadContainer>
      </CardDescription>
    </RecipeCardContainer>
  );
};

export default RecipeCard;
