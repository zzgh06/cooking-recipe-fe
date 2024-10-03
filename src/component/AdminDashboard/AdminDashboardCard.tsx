import styled from '@emotion/styled';
import { Card, CardContent, Typography } from '@mui/material';
import React, { ReactNode } from 'react'

const HoverCard = styled(Card)({
  transition: 'transform 0.2s, background-color 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
  },
});

interface AdminDashboardCardProps {
  title: string;
  content: ReactNode;
  onClick?: () => void; 
}

const AdminDashboardCard = ({ title, content, onClick }: AdminDashboardCardProps) => {
  return (
    <HoverCard onClick={onClick}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" component="p">
          {content}
        </Typography>
      </CardContent>
    </HoverCard>
  )
}

export default AdminDashboardCard