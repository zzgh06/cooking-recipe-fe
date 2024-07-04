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
  height: "200px",
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
  color : "gray"
});

const RecipeCard = ({ item }) => {
  const navigate = useNavigate();

  const showRecipe = (id) => {
    navigate(`/recipe/${id}`);
  };

  console.log(item);

  return (
    <RecipeCardContainer>
      <RecipeImage
        src={item.images}
        alt={item.name}
        onClick={() => showRecipe(item._id)}
      />
      <CardDescription>
        <Typography variant="h6" align="center" sx={{ fontSize : "20px",fontWeight: "600"}}>
          {item.name}
        </Typography>
        <HeadContainer>
          <Typography variant="subtitle1" align="center" sx={{paddingRight : "15px"}}>
            <FontAwesomeIcon icon={faSignal} /> {item.difficulty}
          </Typography>
          <Typography variant="subtitle1" align="center">
          <FontAwesomeIcon icon={faClock} /> {item.time.split("이내")}
          </Typography>
        </HeadContainer>
      </CardDescription>
    </RecipeCardContainer>
  );
};

export default RecipeCard;
