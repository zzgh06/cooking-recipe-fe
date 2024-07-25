import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import PaymentForm from "../component/PaymentForm/PaymentForm";
import "../style/paymentPage.style.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { cc_expires_format } from "../utils/number";
import OrderReceipt from "../component/OrderReceipt/OrderReceipt";
import { useDeleteSelectedCartItems } from "../hooks/Cart/useDeleteSelectedCartItems"; 
import { useCreateOrder } from "../hooks/Order/useCreateOrder";

const PaymentPage = () => {
  const { cartItem, selectedItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [cardValue, setCardValue] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });
  const [shipInfo, setShipInfo] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    address: "",
    city: "",
    zip: "",
  });

  const { mutate: deleteSelectedItems, isLoading: isDeleting } = useDeleteSelectedCartItems();
  const { mutate: createOrder, isLoading: isOrdering, isError, isSuccess } = useCreateOrder();

  const selectedCartItems = cartItem.filter((item) =>
    selectedItems.includes(item.ingredientId._id)
  );

  const totalPrice = selectedCartItems.reduce(
    (total, item) => total + item.ingredientId.price * item.qty,
    0
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { firstName, lastName, contact, address, city, zip } = shipInfo;
    const data = {
      totalPrice: totalPrice,
      contactInfo: {
        shipTo: { address, city, zip },
        contact: { firstName, lastName, contact },
      },
      items: selectedItems.map((id) => {
        const item = cartItem.find((item) => item?.ingredientId._id === id);
        return {
          ingredientId: id,
          price: item?.ingredientId.price,
          qty: item?.qty,
        };
      }),
    };
    try {
      await deleteSelectedItems(); 
      createOrder(data);
    } catch (error) {
      console.error("Failed to delete cart items:", error);
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setShipInfo({ ...shipInfo, [name]: value });
  };

  const handlePaymentInfoChange = (event) => {
    const { name, value } = event.target;
    if (name === "expiry") {
      let newValue = cc_expires_format(value);
      setCardValue({ ...cardValue, [name]: newValue });
      return;
    }
    setCardValue({ ...cardValue, [name]: value });
  };

  const handleInputFocus = (e) => {
    setCardValue({ ...cardValue, focus: e.target.name });
  };

  useEffect(() => {
    if (cartItem.length === 0) {
      navigate("/cart");
    }
  }, [cartItem.length, navigate]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/payment/success");
    }
  }, [isSuccess, navigate]);

  return (
    <Container sx={{ my: 3 }}>
      <Grid container spacing={2}>
        <Grid item lg={7}>
          <Box>
            <Typography variant="h4" component="h2" className="mb-2">
              배송 주소
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="성"
                    variant="outlined"
                    fullWidth
                    onChange={handleFormChange}
                    required
                    name="lastName"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="이름"
                    variant="outlined"
                    fullWidth
                    onChange={handleFormChange}
                    required
                    name="firstName"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="연락처"
                    variant="outlined"
                    fullWidth
                    onChange={handleFormChange}
                    required
                    name="contact"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="주소"
                    variant="outlined"
                    fullWidth
                    onChange={handleFormChange}
                    required
                    name="address"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="City"
                    variant="outlined"
                    fullWidth
                    onChange={handleFormChange}
                    required
                    name="city"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Zip"
                    variant="outlined"
                    fullWidth
                    onChange={handleFormChange}
                    required
                    name="zip"
                  />
                </Grid>
              </Grid>
              <Box className="mobile-receipt-area">
                <OrderReceipt
                  selectedCartItems={selectedCartItems}
                  totalPrice={totalPrice}
                />
              </Box>
              <Box sx={{ marginTop: "20px" }}>
                <Typography
                  variant="h4"
                  component="h2"
                  className="payment-title"
                >
                  결제 정보
                </Typography>
                <PaymentForm
                  cardValue={cardValue}
                  handleInputFocus={handleInputFocus}
                  handlePaymentInfoChange={handlePaymentInfoChange}
                />
              </Box>
              <Button
                variant="contained"
                color="primary"
                className="payment-button pay-button"
                type="submit"
                disabled={isDeleting || isOrdering} // 버튼 비활성화
                sx={{ width: "100%" }}
              >
                결제하기
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={5} className="receipt-area">
          <OrderReceipt
            selectedCartItems={selectedCartItems}
            totalPrice={totalPrice}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PaymentPage;
