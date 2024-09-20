import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, styled } from '@mui/material';
import { User } from '../../types';


const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  boxShadow: theme.shadows[1],
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

interface UserTableProps {
  header: string[];
  data: User[];
  onRowClick: (user: User) => void;
}

const UserTable = ({ header, data, onRowClick }: UserTableProps) => {
  return (
    <Box sx={{ overflowX: 'auto' }}>
      <StyledTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {header.map((title, index) => (
                <TableCell key={index}>{title}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length > 0 ? (
              data.map((user, index) => (
                <StyledTableRow 
                  key={index} 
                  hover 
                  onClick={() => onRowClick(user)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{index}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.level}</TableCell>
                  <TableCell>{user.createdAt ? user.createdAt.slice(0, 10) : 'N/A'}</TableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <TableCell colSpan={header.length}>
                  <Typography align="center">No Data to show</Typography>
                </TableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Box>
  );
};

export default UserTable;
