import React from "react";
import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, } from "@mui/material";
import { styled } from "@mui/material/styles";
import { currencyFormat } from "../../utils/number";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  boxShadow: theme.shadows[1],
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  minWidth: 100,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const OrderTable = ({ header, data, openEditForm, badgeBg }) => {
  return (
    <StyledTableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {header.map((title, index) => (
              <StyledTableCell key={index}>{title}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length > 0 ? (
            data.map((item, index) => (
              <StyledTableRow key={index} onClick={() => openEditForm(item)}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>{item.orderNum}</StyledTableCell>
                <StyledTableCell>{item.createdAt.slice(0, 10)}</StyledTableCell>
                <StyledTableCell>{item.userId?.email}</StyledTableCell>
                <StyledTableCell>
                  {item.items.length > 0 ? (
                    <>
                      {item.items[0].ingredientId?.name}
                      {item.items.length > 1 && ` 외 ${item.items.length - 1}개`}
                    </>
                  ) : (
                    "-"
                  )}
                </StyledTableCell>
                <StyledTableCell>
                  {item.contactInfo.shipTo.address + " " + item.contactInfo.shipTo.city}
                </StyledTableCell>
                <StyledTableCell>{currencyFormat(item.totalPrice)}</StyledTableCell>
                <StyledTableCell>
                  <Chip label={item.status} color={badgeBg[item.status] || 'default'} />
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <TableRow>
              <StyledTableCell colSpan={header.length} align="center">
                <Typography>No Data to show</Typography>
              </StyledTableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default OrderTable;
