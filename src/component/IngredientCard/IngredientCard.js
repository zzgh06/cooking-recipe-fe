import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
  styled,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, editCartItem } from "../../redux/cartSlice";
import { currencyFormat } from "../../utils/number";

const StyledCard = styled(Card)({
  position: "relative",
  marginBottom: "10px",
  width: "100%",
  padding: "10px 20px",
  transition: "all 0.5s",
  boxShadow: "none",
});

const StyledCardMedia = styled(CardMedia)({
  width: "100%",
  height: "315px",
  marginBottom: "15px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s",
  "&:hover": {
    transform: "scale(1.01)",
  },
});

const Title = styled(Typography)({
  fontSize: "17px",
  fontWeight: 600,
});

const Price = styled(Typography)({
  marginTop: "8px",
  fontSize: "19px",
  fontWeight: 600,
  color: "black",
});

const OriginPrice = styled(Typography)({
  fontSize: "15px",
  color: "rgb(164, 164, 164)",
  textDecoration: "line-through",
});

const DiscountRate = styled(Typography)({
  fontSize: "19px",
  fontWeight: 600,
  color: "orangered",
});

const DiscountPrice = styled(Typography)({
  fontSize: "19px",
  fontWeight: 600,
  color: "black",
  marginLeft: "10px",
});

const IngredientCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useSelector((state) => state.auth);

  const showIngredient = (id) => {
    navigate(`/ingredients/${id}`);
  };

  const calculateDiscountedPrice = (price, discountRate=0) => {
    const discountedPrice = price * (1 - discountRate / 100);
    return Math.floor(discountedPrice);
  };

  const handleQtyChange = (event, id) => {
    setQty(event.target.value);
    dispatch(editCartItem({ ingredientId: id, qty: event.target.value }));
  };

  const addCart = () => {
    if (!user) navigate("/login");
    dispatch(addItemToCart({ ingredientId: item._id, qty }));
    handleClose();
  };

  return (
    <>
      <StyledCard>
        <StyledCardMedia
          component="img"
          image={item.images[0]}
          alt={item.images}
          onClick={() => showIngredient(item?._id)}
        />
        <Button
          variant="outlined"
          sx={{ width: "100%", padding: "5px 0" }}
          onClick={handleOpen}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          <Typography variant="body2" sx={{ marginLeft: "10px" }}>
            담기
          </Typography>
        </Button>
        <CardContent>
          <Title>{item?.name}</Title>
          <Box>
            {item?.discountPrice ? (
              <>
                <OriginPrice>{item?.price}원</OriginPrice>
                <Box display="flex" alignItems="center">
                  <DiscountRate>{item?.discountPrice}%</DiscountRate>
                  <DiscountPrice>
                    {currencyFormat(calculateDiscountedPrice(item?.price, item?.discountPrice))}
                    원
                  </DiscountPrice>
                </Box>
              </>
            ) : (
              <Price>{currencyFormat(item?.price)}원</Price>
            )}
          </Box>
        </CardContent>
      </StyledCard>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 350,
            bgcolor: "background.paper",
            borderRadius: "15px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <img
                src={item.images[0]}
                alt={item.name}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={9}>
              <Typography variant="h6" sx={{ mt: 1 }}>
                {item.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {item.name}
              </Typography>
            </Grid>
            <Grid item xs={7}>
              {item?.discountPrice ? (
                <Box display="flex" alignItems="center">
                  <DiscountPrice sx={{ marginLeft: "0" }}>
                    {calculateDiscountedPrice(item?.price, item?.discountPrice)}
                    원
                  </DiscountPrice>
                  <OriginPrice sx={{ marginLeft: "10px" }}>
                    {item?.price}원
                  </OriginPrice>
                </Box>
              ) : (
                <Price>{item?.price}원</Price>
              )}
            </Grid>
            <Grid item xs={5}>
              <FormControl fullWidth>
                <InputLabel>수량</InputLabel>
                <Select
                  value={qty}
                  label="수량"
                  onChange={(event) => handleQtyChange(event, item._id)}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="h6">합계</Typography>
              <Typography variant="h6">{calculateDiscountedPrice(item?.price, item?.discountPrice) * qty}원</Typography>
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" color="error" onClick={handleClose}>
                취소
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="success" onClick={addCart}>
                담기
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default IngredientCard;
