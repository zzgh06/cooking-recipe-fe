import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../../utils/number";
import { setSelectedOrder } from "../../redux/orderSlice";
import { useFetchOrder } from "../../hooks/Order/useFetchOrder";
import { OrderItem } from "../../types";
import { format, isValid, startOfDay, endOfDay } from "date-fns";
import MyPageOrderDialog from "../MyPageOrderDialog/MyPageOrderDialog";
import DateFilterCondition from "../DateFilterCondition/DateFilterCondition";
import Pagination from "react-js-pagination";
import PaginationComponent from "../Pagination/PaginationComponent";

const MyOrderComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<{ [key: string]: string | null }>({});
  const [recentChecked, setRecentChecked] = useState(false);
  const [oldChecked, setOldChecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedOption, setSelectedOption] = useState("orderNum");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useFetchOrder({ ...searchQuery, page });
  const orderList: OrderItem[] = data?.orderList || [];
  const [sortedOrderList, setSortedOrderList] = useState<OrderItem[]>([]);

  const totalPages: number = data?.totalPages || 0;
  const itemsPerPage: number = 1;

  useEffect(() => {
    if (searchQuery.orderNum === "") delete searchQuery.orderNum;
    const params = new URLSearchParams(searchQuery as Record<string, string>);
    navigate("?" + params.toString());
  }, [searchQuery, page, navigate]);

  useEffect(() => {
    if (orderList.length === 0) return;

    let sortedList = [...orderList];
    if (recentChecked) {
      sortedList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (oldChecked) {
      sortedList.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }
    setSortedOrderList(sortedList);
  }, [recentChecked, oldChecked, orderList]);

  const handleRecentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRecentChecked(event.target.checked);
    setOldChecked(!event.target.checked);
  };

  const handleOldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOldChecked(event.target.checked);
    setRecentChecked(!event.target.checked);
  };

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    if (startDate && endDate && isValid(startDate) && isValid(endDate)) {
      const formattedStartDate = startOfDay(startDate);
      const formattedEndDate = endOfDay(endDate);

      setSearchQuery({
        ...searchQuery,
        startDate: format(formattedStartDate, "yyyy-MM-dd HH:mm:ss"),
        endDate: format(formattedEndDate, "yyyy-MM-dd HH:mm:ss"),
      });
    } else {
      setSearchQuery({ ...searchQuery, startDate: null, endDate: null });
    }
  };

  const handleOpenDialog = (order: OrderItem) => {
    setDialogOpen(true);
    dispatch(setSelectedOrder(order));
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const handleReset = () => {
    setRecentChecked(false);
    setOldChecked(false);
    setStartDate(null);
    setEndDate(null);
    setSelectedOption("orderNum");
    setSearchQuery({});
    setPage(1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin border-4 border-green-500 border-t-transparent rounded-full w-24 h-24"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-baseline border-b-4 border-black pb-2">
        <h2 className="text-2xl font-semibold">쇼핑</h2>
        <span className="ml-4 text-lg">내주문</span>
      </div>
      <h3 className="text-md ml-1 mb-1 py-3">최대 지난 3년간의 주문내역까지 확인할 수 있어요</h3>
      <div className="bg-white rounded-lg shadow-sm border-2 border-gray-200 p-6 mb-8">
        <DateFilterCondition
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 pt-5">
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="orderNum">주문번호</option>
            </select>

            <input
              type="text"
              placeholder={selectedOption === "orderNum" ? "주문번호를 입력하세요" : ""}
              value={searchQuery[selectedOption] || ""}
              onChange={(e) =>
                setSearchQuery({
                  ...searchQuery,
                  [selectedOption]: e.target.value,
                })
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            <div className="flex gap-2">
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

          <div className="flex justify-end gap-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={recentChecked}
                onChange={handleRecentChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">최근순</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={oldChecked}
                onChange={handleOldChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">오래된순</span>
            </label>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-sm border-2 border-gray-200" >
        <div className="p-6">
          <h2 className="text-[20px] font-semibold mb-4">주문 내역/배송상태</h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-green-100">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      주문번호
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      주문일자
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      주문내역
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      총주문액
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      주문상태
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedOrderList.length > 0 ? (
                    sortedOrderList.map((item) => (
                      <tr
                        key={item._id}
                        onClick={() => handleOpenDialog(item)}
                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.orderNum}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.createdAt.slice(0, 10)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {item?.items
                            ?.map((item) => item.ingredientId?.name || "")
                            .join(", ")
                            .slice(0, 25)}
                          {item?.items
                            ?.map((item) => item.ingredientId?.name || "")
                            .join(", ").length > 25
                            ? "..."
                            : ""}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                          {currencyFormat(item.totalPrice)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full
                            ${item.status === "delivered" ? "bg-green-100 text-green-800" :
                              item.status === "shipping" ? "bg-blue-100 text-blue-800" :
                                "bg-gray-100 text-gray-800"}`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                        주문 내역이 없습니다
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <PaginationComponent
                activePage={page}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={totalPages * itemsPerPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div >

      <MyPageOrderDialog open={dialogOpen} onClose={handleCloseDialog} />
    </div >
  );
};

export default MyOrderComponent;