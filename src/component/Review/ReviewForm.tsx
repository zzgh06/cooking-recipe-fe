import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    <form 
      className="flex flex-col items-center justify-start gap-4 p-4 mb-4 border border-gray-300 rounded-lg bg-gray-100"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between w-full">
        <h6 className="text-lg">리뷰 작성</h6>
        <div className="cursor-pointer" onClick={onClose}>
          <FontAwesomeIcon icon={faClose} size="lg" />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center">
          <span>평점을 선택해주세요</span>
          <div className="flex flex-col">
            <ReactStars
              count={5}
              onChange={handleStarRatingChange}
              size={24}
              isHalf={false}
              activeColor="#f44f08"
              value={rating}
            />
            {starError && (
              <span className="text-red-500 text-sm">별점을 선택해주세요.</span>
            )}
          </div>
        </div>
      </div>
      <div className="w-full">
        <textarea
          className="w-full p-2 border rounded-md outline-none focus:ring focus:border-orange-500 bg-white"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>

      <button
        className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        type="submit"
      >
        등록
      </button>
    </form>
  );
};

export default ReviewForm;