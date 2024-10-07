import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'; 

const IngredientsDetailSkeleton = () => {
  return (
    <div className="max-w-screen-lg mx-auto py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="text-center">
          <Skeleton height={400} width="100%" />
        </div>
        <div>
          <Skeleton height={32} width="100%" className="mb-4" />
          <Skeleton height={24} width="100%" className="mb-4" />
          <Skeleton height={20} width="100%" className="mb-4" />
          <div className="mt-8 border-t border-gray-300 pt-4">
            <Skeleton height={16} width="100%" className="mb-4" />
            <Skeleton height={24} width="100%" className="mb-4" />
            <Skeleton height={50} width="100%" className="mb-4" />
          </div>
          <Skeleton height={50} width="100%" className="mb-4" />
        </div>
      </div>
      <div className="mt-8">
        <Skeleton height={60} width="100%" className="mb-4" />
        <Skeleton height={20} width="100%" className="mb-4" />
        <Skeleton height={50} width="100%" className="mb-4" />
        <Skeleton height={50} width="100%" className="mb-4" />
      </div>
    </div>
  );
};

export default IngredientsDetailSkeleton;
