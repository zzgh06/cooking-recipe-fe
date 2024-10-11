import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedOrder } from "../redux/orderSlice";
import { endOfDay, format, isValid, startOfDay } from "date-fns";
import { useFetchOrderList } from "../hooks/Order/useFetchOrderList";
import { Order } from "../types";
import OrderTable from "../component/OrderTable/OrderTable";
import DashBoardCard from "../component/DashBoardCard/DashboardCard";
import OrderDetailDialog from "../component/OrderDetailDialog/OrderDetailDialog";
import DateFilterCondition from "../component/DateFilterCondition/DateFilterCondition";
import PaginationComponent from "../component/Pagination/PaginationComponent";

interface SearchQuery {
  page: number;
  orderNum: string;
  startDate: string | null;
  endDate: string | null;
  [key: string]: string | number | null;
}

interface InputState {
  orderNum: string;
}

interface BadgeBg {
  [key: string]: string;
}

const badgeBg: BadgeBg = {
  preparing: "primary",
  shipping: "warning",
  refund: "error",
  delivered: "success",
};

const AdminOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    page: Number(query.get("page")) || 1,
    orderNum: query.get("orderNum") || "",
    startDate: query.get("startDate") || null,
    endDate: query.get("endDate") || null,
  });
  const [inputState, setInputState] = useState<InputState>({
    orderNum: searchQuery.orderNum,
  });

  const [open, setOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("orderNum");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { data, isLoading } = useFetchOrderList(searchQuery);

  const totalPages: number = data?.totalPageNum || 0;
  const itemsPerPage: number = 1;

  const tableHeader: string[] = [
    "#",
    "Order#",
    "Order Date",
    "User",
    "Order Item",
    "Address",
    "Total Price",
    "Status",
  ];

  useEffect(() => {
    const params = new URLSearchParams(searchQuery as Record<string, string>);
    navigate("?" + params.toString());
  }, [searchQuery, navigate]);

  const openEditForm = (order: Order) => {
    setOpen(true);
    dispatch(setSelectedOrder(order));
  };

  const handlePageChange = (pageNumber: number) => {
    setSearchQuery({ ...searchQuery, page: pageNumber });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getOrderCountByStatus = (status: string): number => {
    return data?.data?.filter((order: Order) => order.status === status).length || 0;
  };

  const executeSearch = () => {
    if (startDate && endDate && isValid(startDate) && isValid(endDate)) {
      const formattedStartDate = startOfDay(startDate);
      const formattedEndDate = endOfDay(endDate);

      setSearchQuery((prev) => ({
        ...prev,
        orderNum: inputState.orderNum,
        startDate: format(formattedStartDate, "yyyy-MM-dd HH:mm:ss"),
        endDate: format(formattedEndDate, "yyyy-MM-dd HH:mm:ss"),
        page: 1,
      }));
    } else {
      setSearchQuery((prev) => ({
        ...prev,
        orderNum: inputState.orderNum,
        startDate: null,
        endDate: null,
        page: 1,
      }));
    }
  };

  const handleSearch = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    executeSearch();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      executeSearch();
    }
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedOption("orderNum");
    setInputState({ orderNum: "" });
    setSearchQuery({
      page: 1,
      orderNum: "",
      startDate: null,
      endDate: null,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="h-24 w-24 border-8 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="border-2 border-gray-300 shadow-sm rounded-lg opacity-70 p-4">
        <div className="mb-4">
          <DateFilterCondition
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
          <div className="w-full md:w-1/4 mb-2">
            <select
              value={selectedOption || ""}
              onChange={(event) => setSelectedOption(event.target.value)}
              className="block w-full h-10 border border-gray-300 rounded-md"
            >
              <option value="orderNum">주문번호</option>
            </select>
          </div>
          <div className="w-full md:w-1/4 mb-2">
            <input
              type="text"
              placeholder="내용을 입력해주세요."
              value={inputState[selectedOption as keyof InputState] || ""}
              onChange={(event) =>
                setInputState({
                  ...inputState,
                  [selectedOption]: event.target.value,
                })
              }
              onKeyPress={handleKeyPress}
              className="block w-full h-10 border border-gray-300 rounded-md px-3"
            />
          </div>
          <div className="w-full md:w-1/2 flex justify-end space-x-2 mt-2 md:mt-0">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              검색
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              초기화
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-4">
        {Object.keys(badgeBg).map((status) => (
          <DashBoardCard
            key={status}
            status={status}
            count={getOrderCountByStatus(status)}
          />
        ))}
      </div>

      <OrderTable
        header={tableHeader}
        data={data?.data || []}
        openEditForm={openEditForm}
      />

      <PaginationComponent
        activePage={Number(searchQuery.page)}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={totalPages}
        onPageChange={handlePageChange}
      />

      {open && <OrderDetailDialog open={open} handleClose={handleClose} />}
    </div>
  );
};

export default AdminOrderPage;