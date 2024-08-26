import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TableContainer,
  Paper,
  useMediaQuery,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { currencyFormat } from '../../utils/number';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const cellStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '150px',
};

const MyPageOrderDialog = ({ open, handleClose }) => {
  const { selectedOrder } = useSelector((state) => state.order);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>주문 상세 정보</DialogTitle>
      <DialogContent dividers>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={cellStyle}>주문번호</TableCell>
                <TableCell style={cellStyle}>주문일자</TableCell>
                <TableCell style={cellStyle}>주소</TableCell>
                <TableCell style={cellStyle}>연락처</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell style={cellStyle}>{selectedOrder?.orderNum}</TableCell>
                <TableCell style={cellStyle}>{selectedOrder?.createdAt?.slice(0, 10)}</TableCell>
                <TableCell style={cellStyle}>{selectedOrder?.contactInfo?.shipTo?.address}</TableCell>
                <TableCell style={cellStyle}>{selectedOrder?.contactInfo?.contact?.contact}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper} sx={{ mt: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell style={cellStyle}>상품명</StyledTableCell>
                <StyledTableCell style={cellStyle}>가격</StyledTableCell>
                <StyledTableCell style={cellStyle}>수량</StyledTableCell>
                <StyledTableCell style={cellStyle}>총 가격</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {selectedOrder?.items?.length > 0 &&
                selectedOrder?.items?.map((item) => (
                  <TableRow key={selectedOrder._id}>
                    <TableCell style={cellStyle}>{item?.ingredientId?.name}</TableCell>
                    <TableCell style={cellStyle}>{currencyFormat(item?.ingredientId?.price)}</TableCell>
                    <TableCell style={cellStyle}>{item?.qty}</TableCell>
                    <TableCell style={cellStyle}>{currencyFormat(item?.price * item?.qty)}</TableCell>
                  </TableRow>
                ))}
              <TableCell style={cellStyle}>총 주문액: {currencyFormat(selectedOrder?.totalPrice)}원</TableCell>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MyPageOrderDialog;