import React from "react";

interface DashBoardCardProps {
  status: string;
  count: number;
}

const DashBoardCard = ({ status, count }: DashBoardCardProps) => {
  return (
    <div className="p-2">
      <div className="border-2 border-gray-300 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
        <div className="flex flex-col items-center text-center p-4">
          <h2 className="text-lg font-semibold text-gray-800">{status}</h2>
          <h3 className="text-3xl font-bold text-gray-600 mt-2">{count}</h3>
        </div>
      </div>
    </div>
  );
};

export default DashBoardCard;