import React from 'react';
import { Card, CardContent, Typography, Badge, Box, Grid } from '@mui/material';
import { currencyFormat } from '../../utils/number';

const badgeColors = {
  "Pending": "warning",
  "Processing": "info",
  "Completed": "success",
  "Cancelled": "error",
  "Unknown": "secondary"
};

const OrderStatusCard = ({ orderItem }) => {
  const orderNum = orderItem.orderNum || "N/A";
  const createdAt = orderItem.createdAt ? orderItem.createdAt.slice(0, 10) : "N/A";
  const ingredientName = orderItem.items?.[0]?.ingredientId?.name || "Unknown product";
  const totalPrice = orderItem.totalPrice ? orderItem.totalPrice : "0";
  const status = orderItem.status || "Unknown";
  const badgeColor = badgeColors[status] || "default";

  return (
    <Card sx={{ mb: 2, borderRadius: 2, p: 2, bgcolor: 'white' }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box
            component="img"
            src={orderItem.items[0]?.ingredientId?.image}
            alt={ingredientName}
            sx={{ width: '100%', height: 'auto', borderRadius: 1 }}
          />
        </Grid>
        <Grid item xs={6}>
          <CardContent sx={{ p: 0 }}>
            <Typography variant="body1" fontWeight="bold">
              주문번호: {orderNum}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {createdAt}
            </Typography>
            <Typography variant="body2">
              {ingredientName}
              {orderItem.items.length > 1 && ` 외 ${orderItem.items.length - 1}개`}
            </Typography>
            <Typography variant="body2">
              총 가격 : {currencyFormat(totalPrice)}원
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={3} container alignItems="center" justifyContent="center">
          <Box textAlign="center">
            <Typography variant="caption" color="textSecondary">
              주문상태
            </Typography>
            <Badge color={badgeColor} variant="contained">
              {status}
            </Badge>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default OrderStatusCard;
