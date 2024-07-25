import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { currencyFormat } from "../../utils/number";
import { ORDER_STATUS } from "../../constants/order.constants";
import { useEditOrder } from "../../hooks/Order/useEditOrder";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography
} from "@mui/material";

const OrderDetailDialog = ({ open, handleClose }) => {
  const queryClient = useQueryClient();
  const { selectedOrder } = useSelector((state) => state.order);
  const [orderStatus, setOrderStatus] = useState(selectedOrder.status);

  const { mutate: editOrder, isLoading } = useEditOrder();

  useEffect(() => {
    if (selectedOrder) {
      setOrderStatus(selectedOrder.status);
    }
  }, [selectedOrder]);

  const handleStatusChange = (event) => {
    setOrderStatus(event.target.value);
  };

  const submitStatus = async (event) => {
    event.preventDefault();
    try {
      // Update order status
      await editOrder({ id: selectedOrder._id, status: orderStatus });
      await queryClient.invalidateQueries(['orderList']);
      handleClose();
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  if (!selectedOrder) {
    return null;
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Order Detail</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          예약번호: {selectedOrder.orderNum}
        </Typography>
        <Typography variant="body1" gutterBottom>
          주문날짜: {selectedOrder.createdAt.slice(0, 10)}
        </Typography>
        <Typography variant="body1" gutterBottom>
          이메일: {selectedOrder.userId.email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          주소: {selectedOrder.contactInfo.shipTo.address} {selectedOrder.contactInfo.shipTo.city}
        </Typography>
        <Typography variant="body1" gutterBottom>
          연락처: {selectedOrder.contactInfo.contact.contact}
        </Typography>
        <Typography variant="body1" gutterBottom>
          주문내역
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedOrder.items.length > 0 &&
              selectedOrder.items.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item._id}</TableCell>
                  <TableCell>{item.ingredientId.name}</TableCell>
                  <TableCell>{currencyFormat(item.price)}</TableCell>
                  <TableCell>{item.qty}</TableCell>
                  <TableCell>{currencyFormat(item.price * item.qty)}</TableCell>
                </TableRow>
              ))}
            <TableRow>
              <TableCell colSpan={4}>총계:</TableCell>
              <TableCell>{currencyFormat(selectedOrder.totalPrice)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <form onSubmit={submitStatus}>
          <TextField
            select
            label="Status"
            value={orderStatus}
            onChange={handleStatusChange}
            fullWidth
            margin="normal"
          >
            {ORDER_STATUS.map((status, idx) => (
              <MenuItem key={idx} value={status.toLowerCase()}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          닫기
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={submitStatus}
          disabled={isLoading} 
        >
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailDialog;
