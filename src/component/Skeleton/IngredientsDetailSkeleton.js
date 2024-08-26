import React from "react";
import { Container, Grid, Skeleton, Box } from "@mui/material";

const IngredientsDetailSkeleton = () => {
  return (
    <Container maxWidth="lg" sx={{ padding: "50px 0" }}>
      <Grid container spacing={4}>
        <Grid item lg={6} xs={12} sx={{ textAlign: "center" }}>
          <Skeleton variant="rectangular" height={400} />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Skeleton variant="text" sx={{ fontSize: 'h4.fontSize' }} />
          <Skeleton variant="text" sx={{ fontSize: 'h6.fontSize' }} />
          <Skeleton variant="text" sx={{ fontSize: 'body1.fontSize' }} />
          <Box sx={{ mt: 4, borderTop: "1px solid #ddd", pt: 2 }}>
            <Skeleton variant="text" sx={{ fontSize: 'body2.fontSize' }} />
            <Skeleton variant="text" sx={{ fontSize: 'h6.fontSize' }} />
            <Skeleton variant="rectangular" height={50} />
          </Box>
          <Skeleton variant="rectangular" height={50} />
        </Grid>
        <Grid item xs={12} sx={{ mt: 4 }}>
          <Skeleton variant="rectangular" height={60} />
          <Skeleton variant="text" sx={{ fontSize: 'body1.fontSize' }}/>
          <Skeleton variant="rectangular" height={50} />
          <Skeleton variant="rectangular" height={50} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default IngredientsDetailSkeleton;