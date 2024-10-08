import React from "react";
import ReviewStars from "./ReviewStars";
import { Review } from "../../types";

interface ReviewListProps {
  type: string;
  reviews: Review[];
  userId?: string | null;
  onEdit: (review: Review) => void;
  onDelete: (reviewId: string, type: string) => void;
}

const ReviewList = ({ type, reviews, userId, onEdit, onDelete }: ReviewListProps) => {
  return (
    <div>
      {reviews.length === 0 ? (
        <div className="w-full h-24 border border-gray-300 p-4 mb-4 rounded-lg bg-gray-100">
          <div className="flex justify-center items-center p-4">
            <p className="text-lg">작성된 리뷰가 없습니다.</p>
          </div>
        </div>
      ) : (
        reviews && reviews.map((review) => (
          <div
            key={review._id}
            className="border border-gray-300 p-4 mb-4 rounded-lg bg-gray-100"
          >
            <div className="flex items-center gap-2">
              <p className="text-base">평점:</p>
              <ReviewStars startNum={review.rating} />
              <span className="text-sm">
                ({new Date(review.createdAt).toLocaleString()})
              </span>
              <span className="text-sm ml-auto">작성자: {review.userId.id}</span>
            </div>
            <div className="mt-2 flex items-center">
              <p className="text-base">{review.comment}</p>
              {userId && userId === review.userId._id && (
                <div className="ml-auto flex gap-2">
                  <button
                    className="border border-red-500 text-red-500 rounded px-3 py-1 hover:bg-red-500 hover:text-white"
                    onClick={() => onDelete(review._id, type)}
                  >
                    삭제
                  </button>
                  <button
                    className="border border-blue-500 text-blue-500 rounded px-3 py-1 hover:bg-blue-500 hover:text-white"
                    onClick={() => onEdit(review)}
                  >
                    수정
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
