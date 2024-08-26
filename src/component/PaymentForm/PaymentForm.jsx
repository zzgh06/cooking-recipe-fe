import React from "react";
import { Grid, TextField, Box } from "@mui/material";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const PaymentForm = ({
  handleInputFocus,
  cardValue,
  handlePaymentInfoChange,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item md={6} xs={12}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Cards
            cvc={cardValue.cvc}
            expiry={cardValue.expiry}
            focused={cardValue.focus}
            name={cardValue.name}
            number={cardValue.number}
          />
        </Box>
      </Grid>
      <Grid item md={6} xs={12}>
        <Box className="form-area">
          <TextField
            type="tel"
            name="number"
            label="Card Number"
            variant="outlined"
            fullWidth
            onChange={handlePaymentInfoChange}
            onFocus={handleInputFocus}
            required
            inputProps={{ maxLength: 16 }}
            value={cardValue.number}
            margin="normal"
          />
          <TextField
            type="text"
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            onChange={handlePaymentInfoChange}
            onFocus={handleInputFocus}
            required
            value={cardValue.name}
            margin="normal"
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                type="text"
                name="expiry"
                label="MM/DD"
                variant="outlined"
                fullWidth
                onChange={handlePaymentInfoChange}
                onFocus={handleInputFocus}
                required
                value={cardValue.expiry}
                inputProps={{ maxLength: 7 }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="text"
                name="cvc"
                label="CVC"
                variant="outlined"
                fullWidth
                onChange={handlePaymentInfoChange}
                onFocus={handleInputFocus}
                required
                inputProps={{ maxLength: 3 }}
                value={cardValue.cvc}
                margin="normal"
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PaymentForm;
