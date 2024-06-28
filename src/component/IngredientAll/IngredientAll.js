import React from "react";
import "../../style/ingredientAll.style.css";
import IngredientCard from "../IngredientCard/IngredientCard";
import { Col, Row } from "react-bootstrap";

const IngredientAll = ({ ingredientsList }) => {
  return (
    <div className="ingredient-all__container">
      <h3>모든 상품</h3>
      <Row>
        {ingredientsList.map((ing) => (
          <Col lg={3} key={ing._id}>
            <IngredientCard key={ing._id} item={ing} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default IngredientAll;
