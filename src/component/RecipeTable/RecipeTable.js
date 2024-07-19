import React from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

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
}));

const RecipeTable = ({ header = [], data = [], deleteItem, openEditForm }) => {
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
          {data.length > 0 ? (
            data.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>{item?.name || "N/A"}</StyledTableCell>
                <StyledTableCell>{item?.categories?.etc || "N/A"}</StyledTableCell>
                <StyledTableCell>{item?.time || "N/A"}</StyledTableCell>
                <StyledTableCell>{item?.servings || "N/A"}</StyledTableCell>
                <StyledTableCell>{item?.difficulty || "N/A"}</StyledTableCell>
                <StyledTableCell>{item?.reviewCnt || "N/A"}</StyledTableCell>
                <StyledTableCell>
                  {item?.images && item.images.length > 0 ? (
                    <img
                      src={item.images[0]}
                      alt="Recipe"
                      style={{ width: "100px" }}
                    />
                  ) : (
                    "N/A"
                  )}
                </StyledTableCell>
                <StyledTableCell>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => deleteItem(item._id)}
                      style={{ marginRight: '8px' }}
                    >
                      Delete
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => openEditForm(item)}
                    >
                      Edit
                    </Button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <TableRow>
              <StyledTableCell colSpan={header.length} style={{ textAlign: 'center' }}>
                <Typography>No Data to show</Typography>
              </StyledTableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default RecipeTable;
