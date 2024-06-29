import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRecipeById } from '../redux/recipeSlice';
import Review from '../component/Review/Review';
import '../style/RecipeDetail.style.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { recipeDetail, loading, error } = useSelector(state => state.recipe);

  useEffect(() => {
    dispatch(fetchRecipeById(id));
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="recipe-detail-container">
      {recipeDetail && (
        <>
          <div className="recipe-detail-header">
            <img src={recipeDetail.images[0]} alt={recipeDetail.name} className="recipe-detail-image" />
          </div>
          <div className="recipe-detail-main">
            <div className="recipe-detail-left">
              <h1>{recipeDetail.name}</h1>
              <p>{recipeDetail.description}</p>
              <h2>카테고리</h2>
              <ol>
                {recipeDetail.steps.length > 0 ? (
                  recipeDetail.steps.map((step, index) => (
                    <li key={index} className="step-item">
                      {step.image && <img src={step.image} alt={`step-${index + 1}`} className="step-image" />}
                      <p>{step.description}</p>
                    </li>
                  ))
                ) : (
                  <li>만드는 방법이 없습니다.</li>
                )}
              </ol>
            </div>
            <div className="recipe-detail-right">
            <div className="recipe-detail-meta">
                <div className="meta-item">
                  <div className="meta-text">준비 시간</div>
                  <div className='meta-data'>{recipeDetail.time}</div>
                  <span className="meta-icon">⏱</span>
                  
                </div>
                <div className="meta-item">                  
                  <div className="meta-text">인분</div>
                  <div className='meta-data'>{recipeDetail.servings}</div>
                  <span className="meta-icon">🍽</span>
                </div>

                <div className="meta-item">                  
                  <div className="meta-text">난이도</div>
                  <div className='meta-data'> {recipeDetail.difficulty} </div>
                  <span className="meta-icon">⭐</span>
                </div>
                </div>
                <h2>레시피 카테고리</h2>
              <ul>
                <li>음식 종류: {recipeDetail.categories.food}</li>
                <li>상황: {recipeDetail.categories.mood}</li>
                <li>방법: {recipeDetail.categories.method}</li>
                <li>재료: {recipeDetail.categories.ingredient}</li>
                <li>기타: {Array.isArray(recipeDetail.categories.etc) ? recipeDetail.categories.etc.join(', ') : recipeDetail.categories.etc}</li>
              </ul>

              <h2>레시피 재료</h2>
              <ul>
                {recipeDetail.ingredients.map(ingredient => (
                  <li key={ingredient._id}>{ingredient.name} - {ingredient.qty} {ingredient.unit}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="recipe-detail-reviews">
            <Review type="recipe" itemId={recipeDetail._id} />
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeDetail;
