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
import { RootState } from "../../redux/store";


const HeadContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "baseline",
  borderBottom: "4px solid black",
  paddingBottom: "5px",
  marginBottom: "15px",
});

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
  const {averageRating, totalReviews} = useSelector((state: RootState) => state.review || []);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentReview, setCurrentReview] = useState<ReviewData | null>(null);;
  const [page, setPage] = useState<number>(1);
  const reviewsPerPage = 5;
  const { data, isLoading, refetch } = useFetchReviews({
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
