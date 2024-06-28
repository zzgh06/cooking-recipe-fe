import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, createReview, updateReview, deleteReview } from '../../redux/reviewSlice';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';
import './Review.style.css'

const Review = ({ type, itemId }) => {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.review.reviews || []);
  const user = useSelector(state => state.auth.user || null);
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

  const handleFormSubmit = (comment, rating) => {
    if (editMode && currentReview) {
      dispatch(updateReview({ id: currentReview._id, type, comment, rating }));
      dispatch(fetchReviews({ type, id: itemId }))
    } else {
      
      dispatch(createReview({ type, userId: user._id, recipeId: itemId, comment, rating }));
    }
    setShowForm(false);
    setEditMode(false);
    setCurrentReview(null);
    dispatch(fetchReviews({ type, id: itemId })); 
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
      <h2>Reviews</h2>
      {!showForm && <button className="click-button"onClick={handleShowForm}>글쓰기</button>}
      {showForm && (
        <ReviewForm 
          type={type} 
          itemId={itemId} 
          initialComment={currentReview ? currentReview.comment : ''}
          initialRating={currentReview ? currentReview.rating : 0}
          onFormSubmit={handleFormSubmit} 
        />
      )}
      <ReviewList 
        type ={type}
        reviews={reviews} 
        userId={user ? user : null} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Review;
