import React from 'react';
import { Container, Box, Grid, Skeleton } from '@mui/material';

const RecipeSkeleton = () => {
  return (
    <Container sx={{ padding: { xs: "30px", sm: "50px", md: "50px 100px" } }}>
      <Box sx={{ textAlign: "center", padding: "20px" }}>
        <Skeleton 
          variant="rectangular" 
          sx={{ 
            width: "200px", 
            height: "40px", 
            margin: "0 auto",
            marginBottom: "10px"
          }} 
        />
        <Skeleton 
          variant="text" 
          sx={{ 
            width: "150px", 
            margin: "0 auto" 
          }} 
        />
      </Box>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} xs={12}>
          <Skeleton 
            variant="rectangular" 
            sx={{ 
              width: "100%", 
              paddingTop: "100%", // 1:1 aspect ratio
              borderRadius: 1 
            }} 
          />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Skeleton 
                variant="rectangular" 
                sx={{ 
                  width: "100%", 
                  paddingTop: "100%",
                  borderRadius: 1 
                }} 
              />
            </Grid>
            <Grid item xs={6}>
              <Skeleton 
                variant="rectangular" 
                sx={{ 
                  width: "100%", 
                  paddingTop: "100%",
                  borderRadius: 1 
                }} 
              />
            </Grid>
            <Grid item xs={12}>
              <Skeleton 
                variant="rectangular" 
                sx={{ 
                  width: "100%", 
                  height: { 
                    xs: "300px",
                    sm: "300px",
                    md: "200px",
                    lg: "300px"
                  },
                  borderRadius: 1 
                }} 
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecipeSkeleton;