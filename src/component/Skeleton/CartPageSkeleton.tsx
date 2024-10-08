import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CartItemSkeleton = () => (
  <div className="flex mb-4 p-4 items-center border border-gray-300 rounded">
    <div className="flex items-center flex-1 gap-4">
      <Skeleton circle width={24} height={24} />
      <Skeleton width={100} height={100} className="rounded" />
      <div className="flex-1">
        <Skeleton width="60%" height={32} /> 
        <Skeleton width="30%" height={20} /> 
        <Skeleton width="40%" height={32} />
      </div>
    </div>
    <div className="flex flex-col items-center gap-2 ml-4">
      <Skeleton width={60} height={20} />
      <Skeleton width={60} height={40} className="rounded" />
    </div>
    <Skeleton circle width={40} height={40} className="ml-4" />
  </div>
);

const OrderReceiptSkeleton = () => (
  <div className="p-4 border border-gray-300 rounded shadow w-full max-w-[400px] mx-auto">
    <Skeleton width="30%" height={32} className="mb-4" /> 

    {[...Array(3)].map((_, index) => (
      <div key={index} className="flex justify-between py-2">
        <Skeleton width="60%" height={24} />
        <Skeleton width="20%" height={24} />
      </div>
    ))}

    <div className="flex justify-between pt-4 border-t border-gray-300 mt-4">
      <Skeleton width="20%" height={24} />
      <Skeleton width="30%" height={24} />
    </div>

    <Skeleton width="100%" height={48} className="mt-4 rounded" />

    <div className="mt-4">
      <Skeleton width="100%" height={20} />
      <Skeleton width="90%" height={20} />
      <Skeleton width="95%" height={20} />
    </div>
  </div>
);

const CartPageSkeleton = () => {
  return (
    <div className="mb-8 xs:px-[20px] md:px-[50px] lg:px-[200px]">
      <div className="text-center my-7">
        <Skeleton width={200} height={40} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-1 justify-center">
        <div className="col-span-3">
          {[...Array(3)].map((_, index) => (
            <CartItemSkeleton key={index} />
          ))}
        </div>
        <div className="col-span-2">
          <OrderReceiptSkeleton />
        </div>
      </div>
    </div>
  );
};

export default CartPageSkeleton;
