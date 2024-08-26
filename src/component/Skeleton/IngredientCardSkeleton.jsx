import React from "react";
import {
  Box,
  Card,
  CardContent,
  Skeleton,
  styled,
  Typography,
} from "@mui/material";

const StyledCard = styled(Card)({
  position: "relative",
  marginBottom: "10px",
  width: "100%",
  padding: "10px 20px",
  transition: "all 0.5s",
  boxShadow: "none",
});

const SkeletonCardMedia = styled(Skeleton)({
  width: "100%",
  height: "315px",
  marginBottom: "15px",
  borderRadius: "8px",
});

const SkeletonButton = styled(Skeleton)({
  width: "100%",
  height: "36px",
  marginBottom: "15px",
});

const SkeletonTitle = styled(Skeleton)({
  width: "60%",
  height: "24px",
  marginBottom: "8px",
});

const SkeletonPrice = styled(Skeleton)({
  width: "40%",
  height: "24px",
});

const IngredientCardSkeleton = () => (
  <StyledCard>
    <SkeletonCardMedia variant="rectangular" />
    <SkeletonButton variant="rectangular" />
    <CardContent>
      <SkeletonTitle variant="text" />
      <SkeletonPrice variant="text" />
    </CardContent>
  </StyledCard>
);

export default IngredientCardSkeleton;