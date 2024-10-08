import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const RecipeDetailSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto mt-20 px-4">
      <div className="mb-8">
        <Skeleton height={500} className="rounded-lg" />
      </div>

      <div className="mb-8">
        <Skeleton width="40%" height={30} className="mb-2" />
        <Skeleton width="60%" height={40} />
      </div>

      <div className="mb-8">
        <Skeleton width="100%" height={50} className="mb-2" />
        <Skeleton width="100%" height={50} className="mb-2" />
        <Skeleton width="100%" height={50} />
      </div>

      <div className="mb-8">
        <Skeleton width="100%" height={80} className="mb-2" />
        <Skeleton width="100%" height={80} className="mb-2" />
        <Skeleton width="100%" height={80} />
      </div>

      <div className="mb-8">
        <Skeleton width="100%" height={100} className="mb-2" />
        <Skeleton width="100%" height={100} />
      </div>
    </div>
  );
};

export default RecipeDetailSkeleton;