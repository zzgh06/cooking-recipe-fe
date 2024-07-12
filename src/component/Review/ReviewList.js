import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ReviewStars from "./ReviewStars";

const ReviewList = ({ type, reviews, userId, onEdit, onDelete }) => {
  return (
    <Box>
      {reviews.length === 0 ? (
        <Box
          sx={{
            width: "100%",
            height: "100px",
            border: "1px solid #ccc",
            p: 2,
            mb: 2,
            borderRadius: 1,
            backgroundColor: "#f9f9f9",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
            }}
          >
            <Typography variant="h6" component="p">작성된 리뷰가 없습니다.</Typography>
          </Box>
        </Box>
      ) : (
        reviews.map((review) => (
          <Box
            key={review._id}
            sx={{
              border: "1px solid #ccc",
              p: 2,
              mb: 2,
              borderRadius: 1,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography variant="body1">평점:</Typography>
              <ReviewStars startNum={review.rating} />
              <Typography variant="body2" component="span">
                ({new Date(review.createdAt).toLocaleString()})
              </Typography>
              <Typography variant="body2" sx={{ ml: "auto" }}>
                작성자: {review.userId.id}
              </Typography>
            </Box>
            <Box sx={{ mt: 1, display: "flex", alignItems: "center" }}>
              <Typography variant="body1">{review.comment}</Typography>
              {userId &&
                userId.user &&
                userId.user._id === review.userId._id && (
                  <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => onDelete(review._id, type)}
                    >
                      삭제
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => onEdit(review)}
                    >
                      수정
                    </Button>
                  </Box>
                )}
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

export default ReviewList;
