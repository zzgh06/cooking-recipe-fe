import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faSignal } from "@fortawesome/free-solid-svg-icons";

const RecipeCardContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  border: "none",
  borderRadius: "8px",
  marginBottom: "10px",
  width: "100%",
  padding: "10px",
  overflow: "hidden",
  transition: "all 0.3s ease-in-out",
});

const RecipeImage = styled("img")({
  width: "100%",
  height: "auto",
  maxWidth: "400px",
  maxHeight: "220px",
  aspectRatio: "3 / 2",
  objectFit: "cover",
  borderRadius: "8px",
  transition: "transform 0.3s",
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

const RecipeName = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: '600',
  minWidth: '100px',
  maxWidth: '250px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  [theme.breakpoints.down('md')]: {
    maxWidth: '200px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
    maxWidth: '150px',
  },
}));

const optimizeImageUrl = (url) => {
  return url.replace(/\/upload\//, '/upload/c_fill,h_504,w_504,f_auto,q_auto,f_webp/');
};

const RecipeCard = React.memo(({ item }) => {
  const navigate = useNavigate();
  const optimizedImageUrl = useMemo(() => optimizeImageUrl(item.images[0]), [item.images]);

  const showRecipe = useCallback((id) => {
    navigate(`/recipe/${id}`);
  }, [navigate]);

  return (
    <RecipeCardContainer>
      <RecipeImage
        src={optimizedImageUrl}
        alt={item.name}
        loading="eager"
        fetchPriority="high"
        onClick={() => showRecipe(item._id)}
      />
      <CardDescription>
        <RecipeName variant="h6" align="center">
          {item.name}
        </RecipeName>
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
});

export default RecipeCard;
