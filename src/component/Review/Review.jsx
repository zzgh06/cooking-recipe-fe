import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, CircularProgress, Container, Pagination, styled, Typography } from "@mui/material";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import { setToastMessage } from "../../redux/commonUISlice";
import { useCreateReview } from "../../hooks/Review/useCreateReview";
import { useUpdateReview } from "../../hooks/Review/useUpdateReview";
import { useDeleteReview } from "../../hooks/Review/useDeleteReview";
import { useFetchReviews } from "../../hooks/Review/useFetchReviews";
import { setReviews } from "../../redux/reviewSlice";


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
  const user = useSelector((state) => state.auth.user || null);
  const {averageRating, totalReviews} = useSelector((state) => state.review || []);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const [page, setPage] = useState(1);
  const reviewsPerPage = 5;

  // 리액트 쿼리 훅으로 리뷰 데이터를 가져옵니다
  const { data, isLoading, refetch } = useFetchReviews({
    type,
    id: itemId,
    page,
    limit: reviewsPerPage,
  });
  const { mutate: createReview } = useCreateReview();
  const { mutate: updateReview } = useUpdateReview();
  const { mutate: deleteReview } = useDeleteReview();

  useEffect(() => {
    dispatch(setReviews(data)); 
    refetch();
  }, [data])

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
      updateReview({ id: currentReview._id, type, comment, rating });
    } else {
      createReview({
        type,
        userId: user._id,
        recipeId: itemId,
        comment,
        rating,
      });
    }

    setShowForm(false);
    setEditMode(false);
    setCurrentReview(null);
    refetch();
  };

  const handleEdit = (review) => {
    setShowForm(true);
    setEditMode(true);
    setCurrentReview(review);
    refetch();
  };

  const handleDelete = (reviewId, type) => {
    deleteReview({ id: reviewId, type });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const pageCount = Math.ceil((totalReviews || 0) / reviewsPerPage);

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress size="50px" sx={{color: "green"}} />
      </Container>
    );
  }

  return (
    <div>
      <HeadContainer>
        <Typography variant="h4" fontWeight="600">
          리뷰
        </Typography>
        <Typography variant="h6">⭐{averageRating || 0}</Typography>
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
        reviews={data?.reviews || []}
        userId={user ? user._id : null}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {pageCount > 0 && (
          <Pagination
            count={pageCount}
            size="large"
            sx={{ marginBottom: "20px" }}
            page={page}
            onChange={handlePageChange}
          />
        )}
      </Box>
    </div>
  );
};

export default Review;
