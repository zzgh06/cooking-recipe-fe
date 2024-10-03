import React from "react";
import { Box, Grid, Skeleton, styled } from "@mui/material";

const FridgeContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "10px",
  boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
  border: "2px solid lightgrey",
  [theme.breakpoints.up("md")]: {
    minWidth: "500px",
    minHeight: "400px",
    padding: "20px",
    marginBottom: "20px",
  },
}));

const GridContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "10px",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
}));

const SearchResultCardSkeleton = () => (
  <Box sx={{
    display: 'flex',
    alignItems: 'center',
    width: 350,
    p: 2,
    m: 2,
    boxShadow: 3,
    borderRadius: 1
  }}>
    <Skeleton variant="rectangular" width={100} height={100} 
      sx={{ mr: 2, borderRadius: 1 }} />
    <Box sx={{ flexGrow: 1 }}>
      <Skeleton variant="text" width="80%" height={32} sx={{ mb: 1 }} />
      <Skeleton variant="rectangular" height={36} sx={{ mt: 1 }} />
    </Box>
  </Box>
);

const MyFridgeSkeleton = () => {
  return (
    <Box sx={{ padding: { xs: "20px", sm: "30px", md: "50px 150px" } }}>
      <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
        <Skeleton variant="text" width="200px" height={40} sx={{ margin: "0 auto" }} />
        <Skeleton variant="text" width="300px" height={24} sx={{ margin: "0 auto" }} />
      </Box>

      <GridContainer>
        <FridgeContainer>
          <Grid container spacing={2} sx={{
            alignContent: "flex-start",
            justifyContent: "center",
            marginBottom: "10px",
          }}>
          </Grid>
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}>
            <Skeleton variant="rectangular" width="300px" height={40} 
              sx={{ borderRadius: 1 }} />
          </Box>
        </FridgeContainer>

        <Box>
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            padding: { xs: "0 10px", sm: "0 20px", md: "0 50px" },
            marginBottom: "20px",
          }}>
            <Skeleton variant="text" width="350px" height={32} 
              sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={56} 
              sx={{ borderRadius: 1 }} />
          </Box>

          <Box sx={{
            textAlign: "center",
            padding: "10px 0",
            borderTop: "1px solid lightgrey",
            borderBottom: "1px solid lightgrey",
            marginBottom: "20px",
          }}>
            {[...Array(2)].map((_, index) => (
              <SearchResultCardSkeleton key={index} />
            ))}
          </Box>
        </Box>
      </GridContainer>
    </Box>
  );
};

export default MyFridgeSkeleton;