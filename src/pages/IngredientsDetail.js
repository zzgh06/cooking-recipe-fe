import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getIngredient, getIngredientByName } from "../redux/ingredientSlice";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import { currencyFormat } from "../utils/number";
import AddressInput from "../component/AddressInput/AddressInput";
import DeliveryEstimate from "../component/DeliveryEstimate/DeliveryEstimate";
import Review from "../component/Review/Review";
import { addItemToCart } from "../redux/cartSlice";

const IngredientsDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const [address, setAddress] = useState("지역을 선택해주세요");
  const selectedIngredient = useSelector(
    (state) => state.ingredients.selectedIngredient || {}
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const ingredientName = queryParams.get("name");

    if (ingredientName) {
      dispatch(getIngredientByName(ingredientName));
    } else {
      dispatch(getIngredient(id));
    }
  }, [dispatch, id, location.search]);

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

  const addCart = () => {
    if (!user) navigate("/login");
    dispatch(addItemToCart({ ingredientId: id }));
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <>
      {selectedIngredient._id ? (
        <Container maxWidth="lg" sx={{ padding: "50px 0" }}>
          <Grid container spacing={4}>
            <Grid item lg={6} xs={12} sx={{ textAlign: "center" }}>
              <img
                src={selectedIngredient.image}
                alt={selectedIngredient.name}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <Typography variant="h4" component="div" gutterBottom>
                {selectedIngredient.name}
              </Typography>
              <Typography variant="h6" component="div">
                <span style={{ color : "orangered"}}>30% </span>
                {currencyFormat(selectedIngredient.price)}원
              </Typography>
              <Typography variant="body1" component="div" sx={{ mt: 2 }}>
                {selectedIngredient.description}
              </Typography>
              <Box sx={{ mt: 4, borderTop: "1px solid #ddd", pt: 2 }}>
                <Typography variant="body2" gutterBottom>
                  배송안내
                </Typography>
                <Typography variant="h6">{address}</Typography>
                <AddressInput setAddress={setAddress} />
                <DeliveryEstimate address={address} />
              </Box>
              <Button
                variant="contained"
                color="success"
                sx={{ mt: 2 }}
                onClick={addCart}
              >
                카트에 담기
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ mt: 4 }}>
              <Review type="ingredient" itemId={selectedIngredient._id} />
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "200px"}}>
          <Typography variant="h2">해당 상품이 존재하지 않습니다. 😅</Typography>
          <Button variant='outlined' onClick={goHome} sx={{width: "700px", my: "20px"}}>홈으로 이동</Button>
        </Container>
      )}
    </>
  );
};

export default IngredientsDetail;
