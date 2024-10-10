import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const RecipeSkeleton = () => {
  return (
    <div className="px-6 py-8 sm:px-12 md:px-24">
      <div className="text-center py-5">
        <Skeleton
          className="w-52 h-10 mx-auto mb-2"
          width="20%"
          borderRadius="0.375rem" 
        />
        <Skeleton className="w-36 mx-auto" width="20%" borderRadius="0.375rem" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div className="col-span-1">
          <Skeleton
            className="w-full pt-[100%] rounded-lg"
            borderRadius="0.375rem"
          />
        </div>
        <div className="col-span-1">
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-1">
              <Skeleton
                className="w-full pt-[100%] rounded-lg"
                borderRadius="0.375rem"
              />
            </div>
            <div className="col-span-1">
              <Skeleton
                className="w-full pt-[100%] rounded-lg"
                borderRadius="0.375rem"
              />
            </div>
            <div className="col-span-1 col-span-2">
              <Skeleton
                className="w-full h-72 md:h-48 lg:h-72 rounded-lg"
                borderRadius="0.375rem"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeSkeleton;