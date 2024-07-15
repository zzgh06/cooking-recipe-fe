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
import { Box, Button, styled, Typography } from "@mui/material";

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
  const user = useSelector((state) => state.auth.user || null);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);

  useEffect(() => {
    dispatch(fetchReviews({ type, id: itemId }));
  }, [dispatch, type, itemId]);

  const handleShowForm = () => {
    setShowForm(true);
    setEditMode(false);
    setCurrentReview(null);
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
      dispatch(fetchReviews({ type, id: itemId }));
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

  return (
    <div>
      <HeadContainer>
        <Typography variant="h4" component="strong">
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
    </div>
  );
};

export default Review;
