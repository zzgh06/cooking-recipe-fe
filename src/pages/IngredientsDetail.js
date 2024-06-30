import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getIngredient } from "../redux/ingredientSlice";
import { Col, Container, Row, Button } from "react-bootstrap";
import { currencyFormat } from "../utils/number";
import "../style/IngredientsDetail.style.css";
import AddressInput from "../component/AddressInput/AddressInput";
import DeliveryEstimate from "../component/DeliveryEstimate/DeliveryEstimate";
import Review from "../component/Review/Review";
//import { addItemToCart } from "../redux/cartSlice";
import { addItemToCart } from "../redux/cartSlice";
const IngredientsDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => {
    return state.auth;
  });
  const navigate = useNavigate();

  const [address, setAddress] = useState("지역을 선택해주세요");
  const selectedIngredient = useSelector(
    (state) => state.ingredients.selectedIngredient || []
  );

  useEffect(() => {
    dispatch(getIngredient(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!selectedIngredient._id) return;

    const recentlyIngredient = {
      id: selectedIngredient._id,
      name: selectedIngredient.name,
      image: selectedIngredient.image,
    };

    const viewedIngredients =
      JSON.parse(localStorage.getItem("viewedIngredients")) || [];

    const updatedViewedIngredients = viewedIngredients.filter(
      (item) => item.id !== selectedIngredient._id
    );

    updatedViewedIngredients.unshift(recentlyIngredient);

    localStorage.setItem(
      "viewedIngredients",
      JSON.stringify(updatedViewedIngredients.slice(0, 2))
    );
  }, [selectedIngredient]);

  //console.log("selectedIngredient id", selectedIngredient._id);
  const addCart = () => {
    if (!user) navigate("/login");
    dispatch(addItemToCart({ ingredientId: id }));
  };
  return (
    <div>
      <Container fluid className="ingredient-container">
        <Row>
          <Col lg={6} className="image-container">
            <img
              src={selectedIngredient.image}
              alt={selectedIngredient.name}
              className="img-fluid"
            />
          </Col>
          <Col lg={6} className="ingredient-info-area">
            <div className="ingredient-name">{selectedIngredient.name}</div>
            <div className="ingredient-price">
              <span className="discount-rate">30% </span>
              {currencyFormat(selectedIngredient.price)}원
            </div>
            <div className="ingredient-info">
              {selectedIngredient.description}
            </div>
            <div className="delivery-info">
              <div>배송안내</div>
              <h6>{address}</h6>
              <AddressInput setAddress={setAddress} />
              <DeliveryEstimate address={address} />
            </div>
            <div>
              <Button className="add-button" onClick={addCart}>
                카트에 담기
              </Button>
            </div>
          </Col>
          <div className="recipe-detail-reviews">
            <Review type="ingredient" itemId={selectedIngredient._id} />
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default IngredientsDetail;
