import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchIngredients } from "../redux/ingredientSlice";
import {
  Button,
  Carousel,
  Col,
  Container,
  Dropdown,
  Row,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { currencyFormat } from "../utils/number";
import "../style/IngredientsDetail.style.css";
import AddressInput from "../component/AddressInput/AddressInput";

const IngredientsDetail = () => {
  const { id } = useParams();
  const ingredientId = id;
  const dispatch = useDispatch();
  const [address, setAddress] = useState("지역을 선택해주세요");
  const ingredientList = useSelector(
    (state) => state.ingredients.ingredients || []
  );
  const ingredient = ingredientList.filter((item) => item?._id === id);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  const recentlyIngredient = {
    id: ingredient[0]._id,
    name: ingredient[0].name,
    image: ingredient[0].image,
  };

  useEffect(() => {
    const viewedIngredients =
      JSON.parse(localStorage.getItem("viewedIngredients")) || [];

    const updatedViewedIngredients = viewedIngredients.filter(
      (item) => item.id !== id
    );
    updatedViewedIngredients.unshift(recentlyIngredient);

    localStorage.setItem(
      "viewedIngredients",
      JSON.stringify(updatedViewedIngredients.slice(0, 2))
    );
  }, [ingredientId, recentlyIngredient]);

  console.log(ingredient[0]);
  return (
    <div>
      <Container fluid className="ingredient-container">
        <Row>
          <Col lg={6} className="image-container">
            <img src={ingredient[0].image} alt={ingredient[0].name} className="img-fluid" />
          </Col>
          <Col lg={6} className="ingredient-info-area">
            <div className="ingredient-name">{ingredient[0].name}</div>
            <div className="ingredient-price"><span className="discount-rate">30% </span>{currencyFormat(ingredient[0].price)}원</div>
            <div className="ingredient-info">{ingredient[0].description}</div>
            <div className="delivery-info">
              <div>배송안내</div>
              <h6>{address}</h6>
              <AddressInput setAddress={setAddress} />
              {/* <DeliveryEstimate address={address} /> */}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default IngredientsDetail;
