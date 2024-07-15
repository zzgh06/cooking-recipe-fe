import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid, Typography, Box } from "@mui/material";
import CartItem from "../component/Cart/CartItem";
import OrderReceipt from "../component/OrderReceipt/OrderReceipt";
import { getCart, calculateTotalPrice } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const cartItem = useSelector((state) => state.cart.cartItem);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (user) {
      dispatch(getCart());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (cartItem?.length > 0) {
      dispatch(calculateTotalPrice());
      // 모든 항목을 초기 선택 상태로 설정
      setSelectedItems(cartItem.map(item => item.ingredientId._id));
    }
  }, [cartItem, dispatch]);

  const handleSelectItem = (id) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((item) => item !== id)
        : [...prevSelectedItems, id]
    );
  };

  const calculateSelectedTotalPrice = () => {
    return cartItem
      .filter((item) => selectedItems.includes(item.ingredientId._id))
      .reduce((total, item) => total + item.ingredientId.price * item.qty, 0);
  };


  const handlePurchase = () => {
    const selectedCartItems = cartItem.filter((item) =>
      selectedItems.includes(item.ingredientId._id)
    );
    navigate('/payment')
  };


  return (
    <Container sx={{ mb: 4 }}>
      <Typography variant="h4" component="h2" align="center" sx={{ my: 5 }}>
        장바구니
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {!user || cartItem?.length === 0 ? (
          <Box sx={{ textAlign: "center", width: "100%" }}>
            <Typography variant="h6">장바구니가 비어 있습니다.</Typography>
            <OrderReceipt />
          </Box>
        ) : (
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={7}>
              {cartItem.map((item, index) => (
                <CartItem
                  key={item.ingredientId._id || index}
                  item={item}
                  qty={item.qty}
                  selectedItems={selectedItems}
                  selectItem={handleSelectItem}
                />
              ))}
            </Grid>
            <Grid item xs={12} md={5}>
              <OrderReceipt
                cartItem={cartItem.filter((item) =>
                  selectedItems.includes(item.ingredientId._id)
                )}
                totalPrice={calculateSelectedTotalPrice()}
                handlePurchase={handlePurchase}
                selectedItems={selectedItems}
              />
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default CartPage;
