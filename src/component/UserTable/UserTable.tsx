import React from 'react';
import { User } from '../../types';

interface UserTableProps {
  header: string[];
  data: User[];
  onRowClick: (user: User) => void;
}

const UserTable = ({ header, data, onRowClick }: UserTableProps) => {

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-sm border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr className="bg-gray-50 border-b border-gray-200">
              {header.map((title, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.length > 0 ? (
              data.map((user, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => onRowClick(user)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.level}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.shipTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.createdAt?.slice(0, 10) || 'N/A'}
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

export default UserTable;
