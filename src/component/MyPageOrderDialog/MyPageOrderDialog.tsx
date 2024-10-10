import React from 'react';
import { useSelector } from 'react-redux';
import { currencyFormat } from '../../utils/number';
import { RootState } from '../../redux/store';

interface ContactInfo {
  shipTo: {
    address: string;
  };
  contact: {
    contact: string;
  };
}

interface Item {
  ingredientId: {
    name: string;
    price: number;
  };
  qty: number;
  price: number;
}

interface SelectedOrder {
  _id: string;
  orderNum: string;
  createdAt: string;
  contactInfo: ContactInfo;
  items: Item[];
  totalPrice: number;
}

interface MyPageOrderDialogProps {
  open: boolean;
  onClose: () => void;
}

const MyPageOrderDialog = ({ open, onClose }: MyPageOrderDialogProps) => {
  const selectedOrder = useSelector((state: RootState) => state.order.selectedOrder) as SelectedOrder | null;

  if (!open) return null; 
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-10/12 lg:w-1/2">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">주문 상세 정보</h2>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-gray-700 bg-gray-100">주문번호</th>
                  <th className="px-4 py-2 text-left text-gray-700 bg-gray-100">주문일자</th>
                  <th className="px-4 py-2 text-left text-gray-700 bg-gray-100">주소</th>
                  <th className="px-4 py-2 text-left text-gray-700 bg-gray-100">연락처</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">{selectedOrder?.orderNum}</td>
                  <td className="border px-4 py-2">{selectedOrder?.createdAt?.slice(0, 10)}</td>
                  <td className="border px-4 py-2">{selectedOrder?.contactInfo?.shipTo?.address}</td>
                  <td className="border px-4 py-2">{selectedOrder?.contactInfo?.contact?.contact}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-gray-700 bg-gray-100">상품명</th>
                  <th className="px-4 py-2 text-left text-gray-700 bg-gray-100">가격</th>
                  <th className="px-4 py-2 text-left text-gray-700 bg-gray-100">수량</th>
                  <th className="px-4 py-2 text-left text-gray-700 bg-gray-100">총 가격</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder?.items && selectedOrder.items.length > 0 ? (
                  selectedOrder.items.map((item, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{item?.ingredientId?.name || ""}</td>
                      <td className="border px-4 py-2">{currencyFormat(item?.ingredientId?.price) || 0}</td>
                      <td className="border px-4 py-2">{item?.qty || 0}</td>
                      <td className="border px-4 py-2">{currencyFormat(item?.price * item?.qty) || 0}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="border px-4 py-2 text-center">
                      주문 내역이 없습니다.
                    </td>
                  </tr>
                )}
                <tr>
                  <td colSpan={3} className="border px-4 py-2">총 주문액</td>
                  <td className="border px-4 py-2">
                    {selectedOrder ? currencyFormat(selectedOrder.totalPrice) + '원' : '0원'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-end p-4 border-t">
          <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPageOrderDialog;