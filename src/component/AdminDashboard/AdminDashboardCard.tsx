import React, { ReactNode } from 'react'

interface AdminDashboardCardProps {
  title: string;
  content: ReactNode;
  onClick?: () => void; 
}

const AdminDashboardCard = ({ title, content, onClick }: AdminDashboardCardProps) => {
  return (
    <div
      className="bg-white shadow-md rounded-lg transition-transform duration-200 hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700">{content}</p>
      </div>
    </div>
  );
};

export default AdminDashboardCard