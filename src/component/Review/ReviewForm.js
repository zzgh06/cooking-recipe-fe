import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import ReactStars from "react-rating-stars-component";
import { setToastMessage } from "../../redux/commonUISlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

// hook 함수 내에 또 다른 hook 함수를 중첩해서 
// CustomTextField 내에 글자를 입력하면 포커싱이 아웃되는 버그 발견
// mui styled를 사용한 것들은 함수 밖에 만들어야 이와 같은 버그가 생겨나지 않음
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

const ReviewForm = ({
  type,
  itemId,
  initialComment = "",
  initialRating = 0,
  onFormSubmit,
  onClose,
}) => {
  const [comment, setComment] = useState(initialComment);
  const [rating, setRating] = useState(initialRating);
  const [starError, setStarError] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  // [ 별점 수 확인 및 에러 처리 ]
  const checkStarLength = (value) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating < 1) {
      setStarError(true);
      return;
    }

    onFormSubmit(comment, rating);
    setComment("");
    setRating(0);
  };

  const handleStarRatingChange = (newRating) => {
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

      <Button variant="contained" color="primary" type="submit">
        등록
      </Button>
    </ReviewContainer>
  );
};

export default ReviewForm;