import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './ReviewForm.style.css'; // 스타일링을 위한 CSS 파일 추가

const ReviewForm = ({ type, itemId, initialComment = '', initialRating = 0, onFormSubmit }) => {
  const [comment, setComment] = useState(initialComment);
  const [rating, setRating] = useState(initialRating);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    setComment(initialComment);
    setRating(initialRating);
  }, [initialComment, initialRating]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login'); // 로그인되지 않은 경우 로그인 페이지로 리디렉션
      return;
    }

    onFormSubmit(comment, rating);
    setComment('');
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <div className='comment-container'>
        <label>댓글:</label>
        <textarea
          className='form-text-area'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
      </div>

      <div className='rate-container'>
        <label>평점:</label>
        <input 
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          max={5}
          min={1}
          required
        />
      </div>
      
      <button className='form-button' type="submit">등록</button>
    </form>
  );
};

export default ReviewForm;
