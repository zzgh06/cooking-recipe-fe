import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useSelector } from "react-redux";
import { currencyFormat } from "../../utils/number";
import { ORDER_STATUS } from "../../constants/order.constants";
import { useEditOrder } from "../../hooks/Order/useEditOrder";
import { useQueryClient } from "@tanstack/react-query";
import { RootState } from "../../redux/store";

interface OrderItem {
  _id: string;
  ingredientId: {
    name: string;
  };
  price: number;
  qty: number;
}

interface SelectedOrder {
  _id: string;
  orderNum: string;
  createdAt: string;
  userId: {
    email: string;
  };
  contactInfo: {
    shipTo: {
      address: string;
      city: string;
    };
    contact: {
      contact: string;
    };
  };
  items: OrderItem[];
  status: string;
  totalPrice: number;
}

interface OrderDetailDialogProps {
  open: boolean;
  handleClose: () => void;
}

const OrderDetailDialog = ({ open, handleClose }: OrderDetailDialogProps) => {
  const queryClient = useQueryClient();
  const { selectedOrder } = useSelector((state: RootState) => state.order) as { selectedOrder: SelectedOrder | null };
  const [orderStatus, setOrderStatus] = useState<string>(selectedOrder?.status || "");
  const { mutate: editOrder, isPending } = useEditOrder();

  useEffect(() => {
    if (selectedOrder) {
      setOrderStatus(selectedOrder.status);
    }
  }, [selectedOrder]);

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setOrderStatus(event.target.value);
  };

  const submitStatus = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (selectedOrder) {
        await editOrder({ id: selectedOrder._id, status: orderStatus });
        await queryClient.invalidateQueries({ queryKey: ['orderList'] });
        handleClose();
      }
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };


  if (!selectedOrder) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${open ? 'block' : 'hidden'}`}
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-[600px] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">주문 상세 정보</h2>
        <p className="text-md text-gray-700 font-medium pb-1">예약번호: {selectedOrder.orderNum}</p>
        <p className="text-md text-gray-700 font-medium pb-1">주문날짜: {selectedOrder.createdAt.slice(0, 10)}</p>
        <p className="text-md text-gray-700 font-medium pb-1">이메일: {selectedOrder.userId?.email}</p>
        <p className="text-md text-gray-700 font-medium pb-1">주소: {selectedOrder.contactInfo.shipTo.address} {selectedOrder.contactInfo.shipTo.city}</p>
        <p className="text-md text-gray-700">연락처: {selectedOrder.contactInfo.contact.contact}</p>
        <h3 className="text-md font-semibold mt-4 mb-2">주문내역</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b">ID</th>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Unit Price</th>
                <th className="px-4 py-2 border-b">Qty</th>
                <th className="px-4 py-2 border-b">Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.items.length > 0 &&
                selectedOrder.items.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border-b">{item._id}</td>
                    <td className="px-4 py-2 border-b">{item.ingredientId.name}</td>
                    <td className="px-4 py-2 border-b">{currencyFormat(item.price)}</td>
                    <td className="px-4 py-2 border-b">{item.qty}</td>
                    <td className="px-4 py-2 border-b">{currencyFormat(item.price * item.qty)}</td>
                  </tr>
                ))}
              <tr>
                <td colSpan={4} className="px-4 py-2 border-b font-semibold">총계:</td>
                <td className="px-4 py-2 border-b">{currencyFormat(selectedOrder.totalPrice)}원</td>
              </tr>
            </tbody>
          </table>
        </div>
        <form onSubmit={submitStatus} className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={orderStatus}
            onChange={handleStatusChange}
            className="mt-1 px-2 py-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            {ORDER_STATUS.map((status, idx) => (
              <option key={idx} value={status.toLowerCase()}>
                {status}
              </option>
            ))}
          </select>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={isPending}
              className={`inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2 ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              저장
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              닫기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderDetailDialog;
