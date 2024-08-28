import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  border: `2px solid green`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: theme.shadows[6],
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
}));

interface DashBoardCardProps {
  status: string;
  count: number;
}

const DashBoardCard = ({ status, count }: DashBoardCardProps) => {


  return (
    <Box sx={{ p: 1 }}>
      <StyledCard>
        <StyledCardContent>
          <Typography variant="h6" component="div" color="textPrimary">
            {status}
          </Typography>
          <Typography variant="h4" component="div" color="textSecondary" sx={{ mt: 1 }}>
            {count}
          </Typography>
        </StyledCardContent>
      </StyledCard>
    </Box>
  );
};

export default DashBoardCard;