import React from "react";
import { Col, Row } from "react-bootstrap";
import IngredientCard from "../IngredientCard/IngredientCard";
import "../../style/ingredientThemeCard.style.css"

const IngredientThemeCard = ({ ingredientsList }) => {
  return (
    <div className="ingredient-theme-card__container">
      <Row>
        <Col lg={3} className="ingredient-theme-card__desc">
          <h3>📣 빅세일 추천특가</h3>
          <p>상반기 인기 상품 득템 찬스</p>
        </Col>
        <Col lg={9} className="ingredient-theme-cards">
          {ingredientsList.slice(9, 11).map((ing) => (
            <IngredientCard key={ing._id} item={ing} />
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default IngredientThemeCard;
