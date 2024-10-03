import React from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Ingredient } from "../../types";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  boxShadow: theme.shadows[1],
  borderRadius: theme.shape.borderRadius,
  overflow: 'auto',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  minWidth: 120,
  padding: theme.spacing(1),
  textAlign: 'center',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));


const ImageCell = styled(StyledTableCell)(({ theme }) => ({
  maxWidth: 120,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
}));

const DescriptionCell = styled(StyledTableCell)(({ theme }) => ({
  minWidth: 150,
  maxWidth: 200, 
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));


interface IngredientTableProps {
  header: string[];
  data: Ingredient[];
  deleteItem: (id: string) => void;
  openEditForm: (item: Ingredient) => void;
}

const optimizedImageUrl = (url?: string): string =>
  url ? url.replace(/\/upload\//, "/upload/c_fill,h_200,w_200,f_webp/") : "default_image_url";

const IngredientTable = ({
  header = [],
  data = [],
  deleteItem,
  openEditForm,
}: IngredientTableProps) => {
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
                <DescriptionCell>{item?.description || "N/A"}</DescriptionCell>
                <StyledTableCell>
                  ₩ {item?.price ? item.price.toFixed(0) : "N/A"}
                </StyledTableCell>
                <StyledTableCell>
                  {item?.discountPrice ? item.discountPrice.toFixed(2) : "N/A"}
                </StyledTableCell>
                <StyledTableCell>
                  {Array.isArray(item?.category)
                    ? item.category.join(", ")
                    : "N/A"}
                </StyledTableCell>
                <StyledTableCell>{item?.stock || "N/A"}</StyledTableCell>
                <StyledTableCell>{item?.status || "N/A"}</StyledTableCell>
                <StyledTableCell>{item?.reviewCnt || "N/A"}</StyledTableCell>
                <ImageCell>
                  <img
                    src={optimizedImageUrl(item.images[0]) || "default_image_url"}
                    alt={item.name || "default"}
                    style={{ width: "100px", height: "auto", aspectRatio: "16 / 9" }}
                  />
                </ImageCell>
                <StyledTableCell>
                  <Box display="flex" justifyContent="space-between">
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => deleteItem(item?._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => openEditForm(item)}
                    >
                      Edit
                    </Button>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <TableRow>
              <StyledTableCell colSpan={header.length} align="center">
                <Typography variant="body2" color="textSecondary">
                  No Data to show
                </Typography>
              </StyledTableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default IngredientTable;