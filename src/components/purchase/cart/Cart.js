import React, { useContext } from "react";
import { CartItems } from "./CartItems";
import { Box, Button, Divider, Typography } from "@material-ui/core";
import { CartSummary } from "./CartSummary";
import { TotalContext } from "../../../state/CartProvider";
import "./Cart.css";
import { Link } from "react-router-dom";

export const Cart = (props) => {
  const [total] = useContext(TotalContext);

  if (parseFloat(total.toFixed(2)) > 0)
    return (
      <Box className="cart-main-container">
        <CartItems />
        <Divider orientation="vertical" variant="middle" flexItem />
        <CartSummary handleNextStep={props.handleNextStep} />
      </Box>
    );

  return (
    <Box className="cart-empty-placeholder">
      <Typography variant="h3">Twój koszyk jest pusty</Typography>
      <Link to="product">
        <Button variant="contained" color="primary" style={{ width: "100%" }}>
          {" "}
          Przeglądaj produkty
        </Button>
      </Link>
    </Box>
  );
};
