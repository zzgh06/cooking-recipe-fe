import React, { useEffect } from "react";
import { Container, Grid, Typography, Box, Button, Skeleton } from "@mui/material";
import CartItem from "../component/Cart/CartItem";
import OrderReceipt from "../component/OrderReceipt/OrderReceipt";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useFetchCart } from "../hooks/Cart/useFetchCart";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems, toggleSelectItem } from "../redux/cartSlice";
import { Oval } from "react-loader-spinner";

const CartPage = () => {
  const navigate = useNavigate();
const dispatch = useDispatch();
  const { data: cartItems, isLoading } = useFetchCart();
  const { cartItem, selectedItems} = useSelector((state) => state.cart);

  useEffect(() => {
    if (cartItems) {
      dispatch(setCartItems(cartItems));
    }
  }, [cartItems, dispatch]);

  const selectedCartItems = cartItem?.filter((item) =>
    selectedItems.includes(item?.ingredientId._id)
  );

  const totalPrice = selectedCartItems?.reduce(
    (total, item) => total + item.ingredientId.price * item.qty,
    0
  );

  if (isLoading) {
    return (
      <Container sx={{ mb: 4 }} align="center">
        <Typography variant="h4" component="h2" align="center" sx={{ my: 5 }}>
          장바구니
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "300px" }}>
          <Oval  
            height="80" 
            width="80" 
            color="green" 
            ariaLabel="loading"
          />
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ mb: 4 }}>
      <Typography variant="h4" component="h2" align="center" sx={{ my: 5 }}>
        장바구니
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {!cartItem || cartItem.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              width: "60%",
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "300px",
              borderRadius: 2,
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            <ShoppingCartIcon sx={{ fontSize: 80, color: "grey.500", mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 2 }}>
              장바구니가 비어 있습니다.
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              현재 장바구니에 담긴 아이템이 없습니다. 새로운 상품을
              추가해보세요!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/store")}
              sx={{ width: "90%" }}
            >
              쇼핑하러 가기
            </Button>
          </Box>
        ) : (
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={7}>
              {cartItem.map((item) => (
                <CartItem
                  key={item?.ingredientId._id}
                  item={item}
                  qty={item?.qty}
                  selectItem={toggleSelectItem}
                  selectedItems={selectedItems}
                />
              ))}
            </Grid>
            <Grid item xs={12} md={5}>
              <OrderReceipt
                selectedCartItems={selectedCartItems}
                totalPrice={totalPrice}
              />
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default CartPage;
