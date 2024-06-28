import React from 'react';
import './ReviewList.style.css'; // 스타일링을 위한 CSS 파일 추가

const ReviewList = ({ type, reviews, userId, onEdit, onDelete }) => {
   
  return (
    <div>
      {reviews.map(review => (
        <div key={review._id} className="review-item">
          <div className='review-info'> 
          <strong>평점: {review.rating}</strong> ({new Date(review.createdAt).toLocaleString()})
          <div className="id-container">작성자: {review.userId.id}</div> 
          </div>
          <div className='comment-container'>            
          <p>{review.comment}</p>
          
           
          {userId && userId.user && userId.user._id === review.userId._id && (
              <div className="button-container">
                <button className="button delete" onClick={() => onDelete(review._id, type)}>삭제</button>
                <button className="button edit" onClick={() => onEdit(review)}>수정</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
