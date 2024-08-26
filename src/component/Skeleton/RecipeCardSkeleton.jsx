import React from "react";
import { styled } from "@mui/system";
import { Skeleton, Box } from "@mui/material";

const SkeletonCardContainer = styled(Box)({
  border: "none",
  borderRadius: "8px",
  marginBottom: "10px",
  width: "100%",
  padding: "10px 15px",
  overflow: "hidden",
});

const RecipeCardSkeleton = () => (
  <SkeletonCardContainer>
    <Skeleton variant="rectangular" width="100%" height={200} />
    <Box padding="10px 8px">
      <Skeleton width="60%" />
      <Skeleton width="40%" />
    </Box>
  </SkeletonCardContainer>
);

export default RecipeCardSkeleton;
