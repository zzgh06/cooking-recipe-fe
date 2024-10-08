import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SearchResultCardSkeleton = () => (
  <div className="flex items-center w-[350px] p-4 m-4 shadow-lg rounded">
    <div className="mr-4">
      <Skeleton width={100} height={100} borderRadius={4} />
    </div>
    <div className="flex-grow">
      <Skeleton width="80%" height={32} className="mb-2" />
      <Skeleton height={36} className="mt-2" />
    </div>
  </div>
);

const MyFridgeSkeleton = () => {
  return (
    <div className="p-5 sm:p-8 md:px-40 md:py-12">
      <div className="text-center mb-5">
        <div className="mx-auto w-[200px]">
          <Skeleton height={40} />
        </div>
        <div className="mx-auto w-[300px]">
          <Skeleton height={24} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <div className="flex flex-col justify-center items-center p-3 md:p-5 mb-3 md:mb-5 rounded-lg shadow-md border-2 border-gray-200 md:min-w-[500px] md:min-h-[400px]">
          <div className="grid gap-2 w-full items-start justify-center mb-3">
          </div>
          <div className="w-full flex justify-center mt-4">
            <Skeleton width={300} height={40} borderRadius={4} />
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center px-3 sm:px-5 md:px-12 mb-5">
            <div className="w-[350px] mb-4">
              <Skeleton height={32} />
            </div>
            <div className="w-full">
              <Skeleton height={56} borderRadius={4} />
            </div>
          </div>

          <div className="text-center py-3 border-t border-b border-gray-200 mb-5">
            {[...Array(2)].map((_, index) => (
              <SearchResultCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFridgeSkeleton;