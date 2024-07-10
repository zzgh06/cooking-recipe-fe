import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchRecipeById } from "../redux/recipeSlice";
import {
  addRecipeFavorite,
  deleteRecipeFavorite,
  getRecipeFavorite,
} from "../redux/favoriteSlice";
import Review from "../component/Review/Review";
import "../style/RecipeDetail.style.css";
import { Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import RecipeCategory from "../component/RecipeCategory/RecipeCategory";

const RecipeDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { recipeDetail, loading, error } = useSelector((state) => state.recipe);
  const { recipeFavorite } = useSelector((state) => state.favorite);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    dispatch(fetchRecipeById(id));
    dispatch(getRecipeFavorite());
  }, [dispatch, id]);

  useEffect(() => {
    if (recipeDetail && recipeFavorite) {
      setIsFavorite(recipeFavorite?.recipes?.includes(recipeDetail._id));
    }
  }, [recipeDetail, recipeFavorite]);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(deleteRecipeFavorite(recipeDetail._id));
    } else {
      dispatch(addRecipeFavorite(recipeDetail._id));
    }
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <div className="text-center my-3">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <RecipeCategory />
      <div className="recipe-detail-container">
        {recipeDetail && (
          <>
            <div className="recipe-detail-header">
              <img
                src={recipeDetail.images[0]}
                alt={recipeDetail.name}
                className="recipe-detail-image"
              />
            </div>
            <div className="recipe-detail-main">
              <div className="recipe-detail-left">
                <h1>{recipeDetail.name}</h1>
                <button
                  onClick={handleFavoriteClick}
                  className="favorite-button"
                >
                  {isFavorite ? (
                    <FontAwesomeIcon icon={solidBookmark} />
                  ) : (
                    <FontAwesomeIcon icon={regularBookmark} />
                  )}
                </button>
                <p>{recipeDetail.description}</p>
                <h2>카테고리</h2>
                <ol>
                  {recipeDetail.steps.length > 0 ? (
                    recipeDetail.steps.map((step, index) => (
                      <li key={index} className="step-item">
                        {step.image && (
                          <img
                            src={step.image}
                            alt={`step-${index + 1}`}
                            className="step-image"
                          />
                        )}
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
                    <div className="meta-data">{recipeDetail.time}</div>
                    <span className="meta-icon">⏱</span>
                  </div>
                  <div className="meta-item">
                    <div className="meta-text">인분</div>
                    <div className="meta-data">{recipeDetail.servings}</div>
                    <span className="meta-icon">🍽</span>
                  </div>
                  <div className="meta-item">
                    <div className="meta-text">난이도</div>
                    <div className="meta-data"> {recipeDetail.difficulty} </div>
                    <span className="meta-icon">⭐</span>
                  </div>
                </div>
                <h2>레시피 카테고리</h2>
                <ul>
                  <li>음식 종류: {recipeDetail.categories.food}</li>
                  <li>상황: {recipeDetail.categories.mood}</li>
                  <li>방법: {recipeDetail.categories.method}</li>
                  <li>재료: {recipeDetail.categories.ingredient}</li>
                  <li>
                    기타:{" "}
                    {Array.isArray(recipeDetail.categories.etc)
                      ? recipeDetail.categories.etc.join(", ")
                      : recipeDetail.categories.etc}
                  </li>
                </ul>
                <h2>레시피 재료</h2>
                <ul>
                  {recipeDetail.ingredients.map((ingredient) => (
                    <li key={ingredient._id}>
                      {ingredient.name} - {ingredient.qty} {ingredient.unit}
                    </li>
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
    </>
  );
};

export default RecipeDetail;
