import React, { ReactNode, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { useGetUsersInfo } from '../hooks/User/useGetUsersInfo';
import { useFetchOrderList } from '../hooks/Order/useFetchOrderList';
import { Order } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Card = ({ title, children } : {
  title? : string,
  children : ReactNode
}) => (
  <div className="bg-white rounded-lg shadow-md p-4">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

const StatusTable = ({ orderTableHead, orderData } :{
  orderTableHead: string[],
  orderData: Order[]
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const paginatedData = orderData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {orderTableHead.map((head) => (
                <th key={head} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((order) => (
              <tr key={order._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{order._id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{order.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{order.userId?.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {order.items?.map((item) => item.ingredientId?.name).join(', ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{order.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          <select
            className="border rounded px-2 py-1 text-sm"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(0);
            }}
          >
            {[5, 10, 25].map((value) => (
              <option key={value} value={value}>
                {value} rows
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-500">
            Page {page + 1} of {Math.ceil(orderData.length / rowsPerPage)}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            onClick={() => setPage(page + 1)}
            disabled={page >= Math.ceil(orderData.length / rowsPerPage) - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminDashBoardPage = () => {
  const [selectedTab, setSelectedTab] = useState('preparing');
  const orderTableHead = ['주문번호', '주문일자', '구매자', '상품명', '총 주문액'];
  const { data: usersInfo } = useGetUsersInfo();
  const { data: orderData } = useFetchOrderList();

  const [monthlySales, setMonthlySales] = useState<number[]>([]);
  const [orderStatusCounts, setOrderStatusCounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    if (orderData && orderData.data.length > 0) {
      const sales = calculateMonthlySales(orderData.data);
      setMonthlySales(sales);
      const statusCounts = calculateOrderStatusCounts(orderData.data);
      setOrderStatusCounts(statusCounts);
    }
  }, [orderData]);

  const calculateMonthlySales = (orders: Order[]) => {
    const sales = Array(12).fill(0);
    orders.forEach((order) => {
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

    return [
      statusCounts.preparing,
      statusCounts.shipping,
      statusCounts.delivered,
      statusCounts.refund
    ];
  };

  const getMonthlySignups = (year: number, month: number) => {
    return usersInfo?.usersData.filter((user) => {
      const date = new Date(user.createdAt || '');
      return date.getFullYear() === year && date.getMonth() === month;
    }).length ?? 0;
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

  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  const salesData = {
    labels: monthNames,
    datasets: [
      {
        label: '총 매출',
        data: monthlySales,
        borderColor: '#60A5FA',
        backgroundColor: 'rgba(96, 165, 250, 0.1)',
        fill: true,
      },
    ],
  };

  const newSignups = usersInfo?.usersData.filter((user) => {
    const date = new Date(user.createdAt || '');
    const today = new Date();
    return date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  }).length ?? 0;

  const signupData = {
    labels: [
      monthNames[threeMonthsAgo],
      monthNames[twoMonthsAgo],
      monthNames[lastMonth],
      monthNames[currentMonth]
    ],
    datasets: [
      {
        label: '신규 가입자 수',
        data: [
          threeMonthsAgoSignups,
          twoMonthsAgoSignups,
          lastMonthSignups,
          currentMonthSignups
        ],
        backgroundColor: '#60A5FA',
        barThickness: 40,
      },
    ],
  };

  const tabItems = [
    { id: 'preparing', label: '준비 중', count: orderStatusCounts[0] },
    { id: 'shipping', label: '배송 중', count: orderStatusCounts[1] },
    { id: 'delivered', label: '배송완료', count: orderStatusCounts[2] },
    { id: 'refund', label: '환불', count: orderStatusCounts[3] }
  ];

  const taskItems = [
    { title: '신규 주문', count: orderStatusCounts[0] },
    { title: '환불 주문', count: orderStatusCounts[3] },
    { title: '신규 가입', count: newSignups },
  ];

  const filteredOrderData = orderData?.data?.filter(
    (order) => order.status === selectedTab
  ) ?? [];

  return (
    <div className="min-h-screen py-5">
      <div className="mb-6">
        <Card>
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-bold mr-2">오늘의 할일</h2>
            <span className="text-xl font-bold text-red-500">
              {taskItems.reduce((sum, item) => sum + item.count, 0)}
            </span>
          </div>
          <div className="flex space-x-3">
            {taskItems.map((item, index) => (
              <div key={index} className="text-md font-medium">
                {item.title} {item.count}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="총 매출">
          <div className="h-64">
            <Line 
              data={salesData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </Card>

        <Card title="신규 가입 고객">
          <div className="h-64">
            <Bar
              data={signupData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </Card>

        <div className="col-span-1 md:col-span-2">
          <Card title="주문 상태">
            <div className="mb-4">
              <div className="flex border-b">
                {tabItems.map((tab) => (
                  <button
                    key={tab.id}
                    className={`px-4 py-2 text-sm font-medium ${
                      selectedTab === tab.id
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setSelectedTab(tab.id)}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>
            </div>
            <StatusTable
              orderTableHead={orderTableHead}
              orderData={filteredOrderData}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoardPage;