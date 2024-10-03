import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import ReactStars from "react-rating-stars-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";


const ReviewContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  flexDirection: "column",
  gap: 2,
  padding: "15px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  backgroundColor: "#f9f9f9",
});

const RatingStar = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});

const TextBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  marginBottom: "5px"
});

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "rgba(0, 0, 0, 0.23)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#f44f08",
    },
  },
});

interface ReviewFormProps {
  initialComment?: string;
  initialRating?: number;
  onFormSubmit: (comment: string, rating: number) => void;
  onClose: () => void;
}

const ReviewForm = ({
  initialComment = "",
  initialRating = 0,
  onFormSubmit,
  onClose,
}: ReviewFormProps) => {
  const [comment, setComment] = useState(initialComment);
  const [rating, setRating] = useState(initialRating);
  const [starError, setStarError] = useState(false);

  const checkStarLength = (value: number) => {
    if (value < 1) {
      setStarError(true);
    } else {
      setStarError(false);
    }
  };

  useEffect(() => {
    setComment(initialComment);
    setRating(initialRating);
  }, [initialComment, initialRating]);

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (rating < 1) {
      setStarError(true);
      return;
    }

    onFormSubmit(comment, rating);
    setComment("");
    setRating(0);
  };

  const handleStarRatingChange = (newRating: number) => {
    setRating(newRating);
    checkStarLength(newRating);
  };

  return (
    <ReviewContainer component="form" onSubmit={handleSubmit}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Typography variant="h6">리뷰 작성</Typography>
        <Box onClick={onClose} sx={{cursor : "pointer"}}>
          <FontAwesomeIcon icon={faClose} size="lg" />
        </Box>
      </Box>
      <RatingStar>
        <Typography variant="body1">평점을 선택해주세요</Typography>
        <Box sx={{display:"flex", flexDirection: "column"}}>
        <ReactStars
          count={5}
          onChange={handleStarRatingChange}
          size={24}
          isHalf={false}
          activeColor="#f44f08"
          value={rating}
        />
        {starError && (
          <Typography variant="body2" color="error">
            별점을 선택해주세요.
          </Typography>
        )}
        </Box>
      </RatingStar>
      <TextBox >
        <CustomTextField
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          sx={{ backgroundColor: "white" }}
        />
      </TextBox>

      <Button variant="contained" color="primary" type="submit" sx={{width : "100%"}}>
        등록
      </Button>
    </ReviewContainer>
  );
};

export default ReviewForm;