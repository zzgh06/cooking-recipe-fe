import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
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
  Typography,
  Box
} from "@mui/material";
import { RootState } from "../../redux/store";

interface OrderItem {
  _id: string;
  ingredientId: {
    name: string;
  };
  price: number;
  qty: number;
}

interface SelectedOrder {
  _id: string;
  orderNum: string;
  createdAt: string;
  userId: {
    email: string;
  };
  contactInfo: {
    shipTo: {
      address: string;
      city: string;
    };
    contact: {
      contact: string;
    };
  };
  items: OrderItem[];
  status: string;
  totalPrice: number;
}

interface OrderDetailDialogProps {
  open: boolean;
  handleClose: () => void;
}

const OrderDetailDialog = ({ open, handleClose }: OrderDetailDialogProps) => {
  const queryClient = useQueryClient();
  const { selectedOrder } = useSelector((state: RootState) => state.order) as { selectedOrder: SelectedOrder | null };
  const [orderStatus, setOrderStatus] = useState<string>(selectedOrder?.status || "");
  const { mutate: editOrder, isPending } = useEditOrder();

  useEffect(() => {
    if (selectedOrder) {
      setOrderStatus(selectedOrder.status);
    }
  }, [selectedOrder]);

  const handleStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOrderStatus(event.target.value);
  };

  const submitStatus = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (selectedOrder) {
        await editOrder({ id: selectedOrder._id, status: orderStatus });
        await queryClient.invalidateQueries({ queryKey: ['orderList'] });
        handleClose();
      }
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
        <Box sx={{ mt: 2 }}>
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
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isPending}
                sx={{ mr: 1 }}
              >
                저장
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleClose}>
                닫기
              </Button>
            </Box>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;
