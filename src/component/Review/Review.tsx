import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import { setToastMessage } from "../../redux/commonUISlice";
import { useCreateReview } from "../../hooks/Review/useCreateReview";
import { useUpdateReview } from "../../hooks/Review/useUpdateReview";
import { useDeleteReview } from "../../hooks/Review/useDeleteReview";
import { useFetchReviews } from "../../hooks/Review/useFetchReviews";
import { setReviews } from "../../redux/reviewSlice";
import { RootState } from "../../redux/store";
import Pagination from "@mui/material/Pagination";

interface ReviewProps {
  type: string;
  itemId: string;
}

interface ReviewData {
  _id: string;
  comment: string;
  rating: number;
  userId: { _id: string; id: string };
  [key: string]: any;
}

const Review = ({ type, itemId }: ReviewProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user || null);
  const { averageRating, totalReviews } = useSelector((state: RootState) => state.review || []);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentReview, setCurrentReview] = useState<ReviewData | null>(null);;
  const [page, setPage] = useState<number>(1);
  const reviewsPerPage = 5;
  const { data, isLoading } = useFetchReviews({
    type,
    id: itemId,
    page,
    limit: Number(reviewsPerPage),
  });
  const { mutate: createReview } = useCreateReview();
  const { mutate: updateReview } = useUpdateReview();
  const { mutate: deleteReview } = useDeleteReview();

  useEffect(() => {
    if (data) {
      dispatch(setReviews({
        reviews: data.reviews,
        totalReviews: data.totalReviews,
        allReviews: data.allReviews,
      }));
    }
  }, [data]);

  const handleShowForm = () => {
    if (user) {
      setShowForm(true);
      setEditMode(false);
      setCurrentReview(null);
    } else {
      dispatch(
        setToastMessage({
          message: "로그인한 유저만 리뷰작성이 가능합니다",
          status: "error",
        })
      );
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditMode(false);
    setCurrentReview(null);
  };

  const handleFormSubmit = (comment: string, rating: number) => {
    if (editMode && currentReview) {
      updateReview({ id: currentReview._id, type, comment, rating });
    } else {
      createReview({
        type,
        userId: user?._id as string,
        recipeId: itemId,
        comment,
        rating,
      });
    }

    setShowForm(false);
    setEditMode(false);
    setCurrentReview(null);
  };

  const handleEdit = (review: ReviewData) => {
    setShowForm(true);
    setEditMode(true);
    setCurrentReview(review);
  };

  const handleDelete = (reviewId: string, type: string) => {
    deleteReview({ id: reviewId, type });
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const pageCount = Math.ceil((totalReviews) / Number(reviewsPerPage));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-green-500 border-solid border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-start items-baseline border-b-4 border-black pb-1 mb-4">
        <h4 className="text-2xl font-bold">리뷰</h4>
        <h6 className="text-xl ml-2 font-bold">⭐{averageRating || 0}</h6>
      </div>
      {!showForm && (
        <button
          className="bg-blue-500 text-white p-2 w-32 mb-5 rounded hover:bg-blue-600"
          onClick={handleShowForm}
        >
          리뷰 작성
        </button>
      )}
      {showForm && (
        <ReviewForm
          initialComment={currentReview ? currentReview.comment : ""}
          initialRating={currentReview ? currentReview.rating : 0}
          onFormSubmit={handleFormSubmit}
          onClose={handleCloseForm}
        />
      )}
      <ReviewList
        type={type}
        reviews={data?.reviews || []}
        userId={user ? user._id : null}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {pageCount > 0 && (
        <div className="flex justify-center mt-4 mb-5">
          <Pagination
            count={pageCount}
            size="large"
            page={page}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Review;
