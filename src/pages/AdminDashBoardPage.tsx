import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { useGetUsersInfo } from '../hooks/User/useGetUsersInfo';
import { useFetchOrderList } from '../hooks/Order/useFetchOrderList';
import { Order } from '../types';
import { Box, Grid, Paper, Tab, Tabs, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import AdminDashboardCard from '../component/AdminDashboard/AdminDashboardCard';
import { Bar, Line } from 'react-chartjs-2';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface StatusTableProps {
  orderTableHead: string[];
  orderData: Order[];
}

const AdminDashBoardPage = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const orderTableHead: string[] = ['주문번호', '주문일자', '구매자', '상품명', '총 주문액'];
  const { data: usersInfo } = useGetUsersInfo();
  const { data: orderData } = useFetchOrderList();

  const [monthlySales, setMonthlySales] = useState<number[]>([]);
  const [orderStatusCounts, setOrderStatusCounts] = useState<number[]>([0, 0, 0, 0]);

  const calculateMonthlySales = (orderData: Order[]) => {
    const sales = Array(12).fill(0);
    orderData.forEach((order) => {
      const date = new Date(order.createdAt || '');
      const month = date.getMonth();
      sales[month] += order.totalPrice;
    });
    return sales;
  };

  const calculateOrderStatusCounts = (orders: Order[]) => {
    const statusCounts = {
      preparing: 0,
      shipping: 0,
      delivered: 0,
      refund: 0,
    };

    orders.forEach((order) => {
      if (statusCounts[order.status] !== undefined) {
        statusCounts[order.status]++;
      }
    });

    return [statusCounts.preparing, statusCounts.shipping, statusCounts.delivered, statusCounts.refund];
  };

  useEffect(() => {
    if (orderData && orderData.data.length > 0) {
      const sales = calculateMonthlySales(orderData.data);
      setMonthlySales(sales);

      const statusCounts = calculateOrderStatusCounts(orderData.data);
      setOrderStatusCounts(statusCounts);
    }
  }, [orderData]);

  const getMonthlySignups = (year: number, month: number) => {
    return usersInfo?.usersData.filter((user) => {
      const date = new Date(user.createdAt || '');
      return date.getFullYear() === year && date.getMonth() === month;
    }).length;
  };

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const lastMonth = (currentMonth - 1 + 12) % 12;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const twoMonthsAgo = (currentMonth - 2 + 12) % 12;
  const twoMonthsAgoYear = currentMonth <= 1 ? currentYear - 1 : currentYear;

  const threeMonthsAgo = (currentMonth - 3 + 12) % 12;
  const threeMonthsAgoYear = currentMonth <= 2 ? currentYear - 1 : currentYear;

  const currentMonthSignups = getMonthlySignups(currentYear, currentMonth);
  const lastMonthSignups = getMonthlySignups(lastMonthYear, lastMonth);
  const twoMonthsAgoSignups = getMonthlySignups(twoMonthsAgoYear, twoMonthsAgo);
  const threeMonthsAgoSignups = getMonthlySignups(threeMonthsAgoYear, threeMonthsAgo);

  const monthNames: string[] = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  const signupData = {
    labels: [monthNames[threeMonthsAgo], monthNames[twoMonthsAgo], monthNames[lastMonth], monthNames[currentMonth]],
    datasets: [
      {
        label: `${currentYear}년 가입자 수`,
        data: [threeMonthsAgoSignups, twoMonthsAgoSignups, lastMonthSignups, currentMonthSignups],
        backgroundColor: ['#9BD5FF'],
        barThickness: 15,
      },
    ],
  };

  const salesData = {
    labels: monthNames,
    datasets: [
      {
        label: '총 매출',
        data: monthlySales,
        borderColor: '#9BD5FF',
        fill: true,
      },
    ],
  };

  const refundOrders = orderData?.data.filter((order) => order.status === 'refund').length;
  const newOrders = orderData?.data.filter((order) => order.status === 'preparing').length;
  const shippingCounts = orderData?.data.filter((order) => order.status === 'shipping').length;
  const deliveredCounts = orderData?.data.filter((order) => order.status === 'delivered').length;

  const newSignups = usersInfo?.usersData.filter((user) => {
    const date = new Date(user.createdAt || '');
    return date.getFullYear() === currentYear && date.getMonth() === currentMonth;
  }).length;

  const totalTasks = (newOrders ?? 0) + (refundOrders ?? 0) + (newSignups ?? 0);

  const taskItems = [
    { title: '신규 주문', count: newOrders },
    { title: '환불 주문', count: refundOrders },
    { title: '신규 가입', count: newSignups },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const filteredOrderData = orderData?.data.filter((order) => {
    switch (selectedTab) {
      case 0:
        return order.status === 'preparing';
      case 1:
        return order.status === 'shipping';
      case 2:
        return order.status === 'delivered';
      case 3:
        return order.status === 'refund';
      default:
        return true;
    }
  });

  return (
    <div>
      <Box mb={4}>
        <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginRight: '10px' }}>
              오늘의 할일
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'red' }}>
              {totalTasks}
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {taskItems.map((item, index) => (
              <Grid item key={index}>
                <Typography variant="body1">
                  {item.title} {item.count}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <AdminDashboardCard title="총 매출" content={<Line data={salesData} />} />
        </Grid>
        <Grid item xs={12} md={6}>
          <AdminDashboardCard title="신규 가입 고객" content={<Bar data={signupData} />} />
        </Grid>
        <Grid item xs={12}>
          <AdminDashboardCard
            title="주문 상태"
            content={
              <>
                <Tabs value={selectedTab} onChange={handleTabChange} aria-label="order status tabs">
                  <Tab label={`준비 중 (${newOrders})`} />
                  <Tab label={`배송 중 (${shippingCounts})`} />
                  <Tab label={`배송완료 (${deliveredCounts})`} />
                  <Tab label={`환불 (${refundOrders})`} />
                </Tabs>
                <StatusTable orderTableHead={orderTableHead} orderData={filteredOrderData ?? []} />
              </>
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};

const StatusTable = ({ orderTableHead, orderData }: StatusTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); 
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {orderTableHead.map((head) => (
              <TableCell key={head}>{head}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {orderData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.createdAt}</TableCell>
              <TableCell>{order.userId?.email}</TableCell>
              <TableCell> {order.items?.map((item) => item.ingredientId?.name).join(', ')}</TableCell>
              <TableCell>{order.totalPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={orderData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default AdminDashBoardPage;