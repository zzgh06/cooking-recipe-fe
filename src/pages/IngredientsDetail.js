import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  styled,
} from "@mui/material";
import { currencyFormat } from "../utils/number";
import AddressInput from "../component/AddressInput/AddressInput";
import DeliveryEstimate from "../component/DeliveryEstimate/DeliveryEstimate";
import Review from "../component/Review/Review";
import IngredientsDetailSkeleton from "../component/Skeleton/IngredientsDetailSkeleton";
import { useGetIngredient } from "../hooks/Ingredient/useGetIngredient";
import { useIngredientByName } from "../hooks/Ingredient/useIngredientByName";
import { useAddToCart } from "../hooks/Cart/useAddToCart";
import { useSelector } from "react-redux";

const ShoppingTabs = styled(Tabs)({
  width: "100%",
  backgroundColor: "rgba(245, 245, 245, 0.85)",
  marginBottom: "20px",
});

const StyledTab = styled(Tab)({
  textTransform: "none",
  fontWeight: "bold",
  "&.Mui-selected": {
    color: "#1976d2",
  },
});

const ImageContainer = styled("div")(({ isExpanded }) => ({
  height: isExpanded ? "auto" : "400px",
  overflow: "hidden",
  transition: "height 0.5s ease-in-out",
}));

const MoreButton = styled(Button)({
  width: "600px",
  height: "50px",
});

const IngredientsDetail = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const ingredientName = queryParams.get("name");

  // 훅을 조건에 따라 결과를 사용
  const { data: ingredientDataById, isLoading: isLoadingById } = useGetIngredient(id);
  const { data: ingredientDataByName, isLoading: isLoadingByName } = useIngredientByName(ingredientName);

  // ingredientName이 있을 경우 useIngredientByName의 데이터 사용
  const data = ingredientName ? ingredientDataByName : ingredientDataById;
  const isLoading = ingredientName ? isLoadingByName : isLoadingById;

  const { mutate: addToCart, isLoading: isAdding } = useAddToCart();

  const [address, setAddress] = useState("지역을 선택해주세요");
  const [value, setValue] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const detailsRef = useRef(null);
  const reviewsRef = useRef(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      detailsRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (newValue === 1) {
      reviewsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (data?._id) {
      const recentlyIngredient = {
        id: data._id,
        name: data.name,
        images: data.images[0],
      };

      const viewedIngredients =
        JSON.parse(localStorage.getItem("viewedIngredients")) || [];

      const updatedViewedIngredients = viewedIngredients.filter(
        (item) => item.id !== data._id
      );

      updatedViewedIngredients.unshift(recentlyIngredient);

      localStorage.setItem(
        "viewedIngredients",
        JSON.stringify(updatedViewedIngredients.slice(0, 2))
      );
    }
  }, [data]);

  const addCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    addToCart({ ingredientId: id, qty: 1 }); // 기본 수량 1로 설정
  };

  const goHome = () => {
    navigate("/");
  };

  const calculateDiscountedPrice = (price, discountRate = 0) => {
    const discountedPrice = price * (1 - discountRate / 100);
    return Math.floor(discountedPrice);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (isLoading) {
    return <IngredientsDetailSkeleton />;
  }

  return (
    <>
      {data?._id ? (
        <Container maxWidth="lg" sx={{ padding: "50px 0" }}>
          <Grid container spacing={4}>
            <Grid item lg={6} xs={12} sx={{ textAlign: "center" }}>
              <img
                src={data.images[0]}
                alt={data.name}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <Typography variant="h4" component="div" gutterBottom>
                {data.name}
              </Typography>
              <Typography variant="h6" component="div">
                {data.discountPrice && (
                  <Typography
                    variant="h7"
                    component="span"
                    sx={{ color: "orangered" }}
                  >
                    {data.discountPrice}%{" "}
                  </Typography>
                )}
                {currencyFormat(
                  calculateDiscountedPrice(
                    data.price,
                    data.discountPrice
                  )
                )}
                원
              </Typography>
              <Typography variant="body1" component="div" sx={{ mt: 2 }}>
                {data.description}
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
                sx={{ mt: 1, width: "100%" }}
                onClick={addCart}
                disabled={isAdding}
              >
                카트에 담기
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ mt: 4 }}>
              <ShoppingTabs value={value} onChange={handleChange}>
                <StyledTab label="상세정보" />
                <StyledTab label="리뷰" />
              </ShoppingTabs>
              <Box>
                <Box ref={detailsRef}>
                  <ImageContainer isExpanded={isExpanded}>
                    {data.images[1] ? (
                      <img
                        src={data.images[1]}
                        alt={data.name}
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          padding: "30px",
                        }}
                      >
                        <Typography variant="h3" component="div" sx={{ mt: 2 }}>
                          상세 이미지가 없습니다. 😅
                        </Typography>
                      </Box>
                    )}
                  </ImageContainer>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <MoreButton
                      variant={isExpanded ? "outlined" : "contained"}
                      color="success"
                      onClick={toggleExpand}
                    >
                      {isExpanded ? "간략히 보기" : "상품 상세 더보기"}
                    </MoreButton>
                  </Box>
                  <Typography variant="body1" component="div" sx={{ mt: 2 }}>
                    {data.detail}
                  </Typography>
                </Box>
              </Box>
              <Box ref={reviewsRef}>
                <Review type="ingredient" itemId={data._id} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "200px",
          }}
        >
          <Typography variant="h2">
            해당 상품이 존재하지 않습니다. 😅
          </Typography>
          <Button
            variant="outlined"
            onClick={goHome}
            sx={{ width: "700px", my: "20px" }}
          >
            홈으로 이동
          </Button>
        </Container>
      )}
    </>
  );
};

export default IngredientsDetail;
