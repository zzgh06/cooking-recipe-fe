import { Box, Container, styled } from '@mui/material';
import React from 'react'

const SkeletonBox = styled(Box)({
  backgroundColor: "#e0e0e0",
  borderRadius: "4px",
  marginBottom: "20px",
});

const SkeletonText = styled(Box)({
  height: "20px",
  backgroundColor: "#e0e0e0",
  borderRadius: "4px",
  marginBottom: "10px",
});

const SkeletonImage = styled(Box)({
  width: "100%",
  height: "500px",
  backgroundColor: "#e0e0e0",
  borderRadius: "8px",
  marginBottom: "20px",
});


const RecipeDetailSkeleton = () => {
  return (
    <Container maxWidth="md" sx={{ marginTop: "80px" }}>
        <SkeletonImage />
        <SkeletonBox>
          <SkeletonText sx={{ width: "40%" }} />
          <SkeletonText sx={{ width: "60%" }} />
        </SkeletonBox>
        <SkeletonBox>
          <SkeletonText sx={{ width: "30%" }} />
          <SkeletonText sx={{ width: "50%" }} />
          <SkeletonText sx={{ width: "40%" }} />
        </SkeletonBox>
        <SkeletonBox>
          <SkeletonText sx={{ width: "70%" }} />
          <SkeletonText sx={{ width: "50%" }} />
        </SkeletonBox>
        <SkeletonBox>
          <SkeletonText sx={{ width: "60%" }} />
          <SkeletonText sx={{ width: "80%" }} />
        </SkeletonBox>
      </Container>
  )
}

export default RecipeDetailSkeleton