import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { useAddToCart } from "../hooks/Cart/useAddToCart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Ingredient } from "../types";
import { setToastMessage } from "../redux/commonUISlice";

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

const ImageContainer = styled("div")<{ height: number }>(({ height }) => ({
  height: height,
  overflow: "hidden",
  transition: "height 0.5s ease-in-out",
  position: "relative",
}));

const StyledImage = styled("img")({
  maxWidth: "100%",
  height: "auto",
  display: "block",
});

const GradientOverlay = styled("div")<{ show: boolean }>(({ show }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: show ? "50px" : "0",
  background: "linear-gradient(to bottom, transparent, white)",
  transition: "height 0.5s ease-in-out",
  pointerEvents: "none",
}));

const MoreButton = styled(Button)({
  width: "600px",
  height: "50px",
});

const preloadImage = (url: string) => {
  const img = new Image();
  img.src = url;
};

interface IngredientDetail extends Ingredient {
  detail: string;
}

const IngredientsDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: ingredientDataById, isLoading: isLoadingById } = useGetIngredient(id || "");
  const data = ingredientDataById as IngredientDetail | undefined;
  const isLoading = isLoadingById;
  const { mutate: addToCart, isPending: isAdding } = useAddToCart();

  const [address, setAddress] = useState("지역을 선택해주세요");
  const [value, setValue] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [containerHeight, setContainerHeight] = useState<number>(400);

  const imageRef = useRef<HTMLImageElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (imageRef.current) {
        setContainerHeight(isExpanded ? imageRef.current.offsetHeight : 400);
      }
    };

    if (imageRef.current && imageRef.current.complete) {
      updateHeight();
    } else if (imageRef.current) {
      imageRef.current.addEventListener('load', updateHeight);
    }

    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener('load', updateHeight);
      }
    };
  }, [isExpanded]);

  useEffect(() => {
    if (data?._id) {
      preloadImage(data.images[0]);
      if (data.images[1]) preloadImage(data.images[1]);

      const recentlyIngredient = {
        id: data._id,
        name: data.name,
        images: data.images[0],
      };

      const viewedIngredients: Array<{ id: string; name: string; images: string }> =
        JSON.parse(localStorage.getItem("viewedIngredients") || "[]");

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue === 0) {
      detailsRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (newValue === 1) {
      reviewsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const addCart = () => {
    if (!user) {
      navigate("/login");
      dispatch(setToastMessage({
        message: "로그인이 필요한 서비스 입니다.",
        status: "error",
      }))
      return;
    }
    if (id) {
      addToCart({ ingredientId: id, qty: 1 });
    } else {
      console.error("Ingredient ID is missing");
    }
  };

  const goHome = () => {
    navigate("/");
  };

  const calculateDiscountedPrice = (price: number, discountRate = 0): number => {
    const discountedPrice = price * (1 - discountRate / 100);
    return Math.floor(discountedPrice);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const optimizedImageUrl = (url: string) =>
    url.replace(/\/upload\//, "/upload/c_fill,h_1100,w_1100,f_webp/");

  if (isLoading) {
    return <IngredientsDetailSkeleton />;
  }

  return (
    <>
      {data?._id ? (
        <Container maxWidth="lg" sx={{ padding: "50px 0" }}>
          <Grid container spacing={4}>
            <Grid item lg={6} md={6} xs={12} sx={{ textAlign: "center" }}>
              <img
                src={optimizedImageUrl(data.images[0])}
                alt={data.name}
                style={{ maxWidth: "100%", height: "auto", display: "block" }}
                fetchPriority="high"
              />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <Typography variant="h4" component="div" gutterBottom>
                {data.name}
              </Typography>
              <Typography variant="h6" component="div">
                {data.discountPrice && (
                  <Typography
                    variant="h6"
                    component="span"
                    sx={{ color: "orangered" }}
                  >
                    {data.discountPrice}%{" "}
                  </Typography>
                )}
                {currencyFormat(
                  calculateDiscountedPrice(data.price || 0, data.discountPrice)
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
                  <ImageContainer height={containerHeight}>
                    {data.images[1] ? (
                      <>
                        <StyledImage
                          ref={imageRef}
                          src={optimizedImageUrl(data.images[1])}
                          alt={data.name}
                          loading="lazy"
                        />
                        <GradientOverlay show={!isExpanded} />
                      </>
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
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
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
