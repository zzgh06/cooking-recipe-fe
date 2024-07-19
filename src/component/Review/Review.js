import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../../redux/reviewSlice";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import { Box, Button, Pagination, styled, Typography } from "@mui/material";
import { setToastMessage } from "../../redux/commonUISlice";

const HeadContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "baseline",
  borderBottom: "4px solid black",
  paddingBottom: "5px",
  marginBottom: "15px",
});

const Review = ({ type, itemId }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.review.reviews || []);
  const averageRating = useSelector((state) => state.review.averageRating);
  const totalReviews = useSelector((state) => state.review.totalReviews);
  const user = useSelector((state) => state.auth.user || null);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [page, setPage] = useState(1);
  const [currentReview, setCurrentReview] = useState(null);
  const reviewsPerPage = 5;

  useEffect(() => {
    dispatch(fetchReviews({ type, id: itemId, page, limit: reviewsPerPage }));
  }, [dispatch, type, itemId, page]);

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

  const handleFormSubmit = (comment, rating) => {
    if (editMode && currentReview) {
      dispatch(updateReview({ id: currentReview._id, type, comment, rating }));
    } else {
      dispatch(
        createReview({
          type,
          userId: user._id,
          recipeId: itemId,
          comment,
          rating,
        })
      );
    }

    setShowForm(false);
    setEditMode(false);
    setCurrentReview(null);

    setTimeout(() => {
      dispatch(fetchReviews({ type, id: itemId, page, limit: reviewsPerPage }));
    }, 500);
  };

  const handleEdit = (review) => {
    setShowForm(true);
    setEditMode(true);
    setCurrentReview(review);
  };

  const handleDelete = (reviewId, type) => {
    dispatch(deleteReview({ id: reviewId, type }));
    dispatch(fetchReviews({ type, id: itemId }));
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const pageCount = Math.ceil(totalReviews / reviewsPerPage);

  return (
    <div>
      <HeadContainer>
        <Typography variant="h4" fontWeight="600">
          리뷰
        </Typography>
        <Typography variant="h6">⭐{averageRating}</Typography>
      </HeadContainer>
      {!showForm && (
        <Button
          variant="contained"
          onClick={handleShowForm}
          sx={{ width: "120px", p: 1, marginBottom: "20px" }}
        >
          리뷰 작성
        </Button>
      )}
      {showForm && (
        <ReviewForm
          type={type}
          itemId={itemId}
          initialComment={currentReview ? currentReview.comment : ""}
          initialRating={currentReview ? currentReview.rating : 0}
          onFormSubmit={handleFormSubmit}
          onClose={handleCloseForm}
        />
      )}

      <ReviewList
        type={type}
        reviews={reviews}
        userId={user ? user : null}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {pageCount > 0 ? (
          <Pagination
            count={pageCount}
            size="large"
            sx={{ marginBottom: "20px" }}
            page={page}
            onChange={handlePageChange}
          />
        ) : (
          null
        )}
      </Box>
    </div>
  );
};

export default Review;
