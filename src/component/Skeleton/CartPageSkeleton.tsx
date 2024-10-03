import React from "react";
import { Container, Grid, Typography, Box, Skeleton } from "@mui/material";

const CartItemSkeleton = () => (
  <Box sx={{ display: 'flex', mb: 2, p: 2, alignItems: 'center', border: "1px solid lightgrey", borderRadius: 1 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', flex: '1 0 auto', gap: 2 }}>
      <Skeleton variant="circular" width={24} height={24} />
      <Skeleton variant="rectangular" width={100} height={100} sx={{ borderRadius: 1 }} />
      <Box sx={{ flex: '1 0 auto' }}>
        <Skeleton variant="text" width="60%" height={32} /> {/* Name */}
        <Skeleton variant="text" width="30%" height={20} /> {/* Unit */}
        <Skeleton variant="text" width="40%" height={32} /> {/* Price */}
      </Box>
    </Box>

    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, ml: 2 }}>
      <Skeleton variant="text" width={60} height={20} />
      <Skeleton variant="rectangular" width={60} height={40} sx={{ borderRadius: 1 }} />
    </Box>

    <Skeleton variant="circular" width={40} height={40} sx={{ ml: 2 }} />
  </Box>
);

const OrderReceiptSkeleton = () => (
  <Box sx={{
    p: 3,
    border: "1px solid",
    borderColor: "grey.300",
    borderRadius: 1,
    boxShadow: 1,
    width: "100%",
    maxWidth: 800,
    mx: "auto"
  }}>
    <Skeleton variant="text" width="30%" height={32} sx={{ mb: 2 }} /> {/* Title */}

    {[...Array(3)].map((_, index) => (
      <Box key={index} sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
        <Skeleton variant="text" width="60%" height={24} />
        <Skeleton variant="text" width="20%" height={24} />
      </Box>
    ))}

    <Box sx={{
      display: "flex",
      justifyContent: "space-between",
      pt: 2,
      borderTop: "1px solid",
      borderColor: "grey.300",
      mt: 2,
    }}>
      <Skeleton variant="text" width="20%" height={24} />
      <Skeleton variant="text" width="30%" height={24} />
    </Box>

    <Skeleton variant="rectangular" width="100%" height={48} sx={{ mt: 2, borderRadius: 1 }} />

    <Box sx={{ mt: 2 }}>
      <Skeleton variant="text" width="100%" height={20} />
      <Skeleton variant="text" width="90%" height={20} />
      <Skeleton variant="text" width="95%" height={20} />
    </Box>
  </Box>
);

const CartPageSkeleton = () => {
  return (
    <Container sx={{ mb: 4 }}>
      <Box sx={{ textAlign: "center", margin: "30px 0" }}>
        <Skeleton variant="text" width="200px" height={40} sx={{ margin: "0 auto" }} />
      </Box>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={7}>
          {[...Array(3)].map((_, index) => (
            <CartItemSkeleton key={index} />
          ))}
        </Grid>
        <Grid item xs={12} md={5}>
          <OrderReceiptSkeleton />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPageSkeleton;