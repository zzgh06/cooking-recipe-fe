import React from "react";
import { currencyFormat } from "../../utils/number";
import { Order } from "../../types";

const badgeColors: { [key: string]: string } = {
  preparing: "bg-blue-700 text-white",
  shipping: "bg-yellow-500 text-white",
  refund: "bg-red-700 text-white",
  delivered: "bg-green-700 text-white",
};

interface OrderTableProps {
  header: string[];
  data: Order[];
  openEditForm: (item: Order) => void;
}

const OrderTable = ({ header, data, openEditForm }: OrderTableProps) => {
  return (
    <div className="w-full overflow-hidden rounded-lg shadow-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {header.map((title, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                  onClick={() => openEditForm(item)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.orderNum}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.userId?.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.items.length > 0 ? (
                      <>
                        {item.items[0].ingredientId?.name}
                        {item.items.length > 1 && ` 외 ${item.items.length - 1}개`}
                      </>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.contactInfo?.shipTo.address + " " + item.contactInfo?.shipTo.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {currencyFormat(item.totalPrice)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                        badgeColors[item.status] || "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={header.length}
                  className="px-6 py-4 text-sm text-gray-500 text-center"
                >
                  No Data to show
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
