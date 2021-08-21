import React, { useContext } from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { TotalContext } from "../../../state/CartProvider";
import "./CartSummary.css";

export const CartSummary = (props) => {
  const [total] = useContext(TotalContext);
  return (
    <Box className="cart-summary-main-container">
      <Box style={{ marginTop: "10px" }}>
        <Typography variant="h5" style={{ marginBottom: "25px" }}>
          Łączna cena: {total.toFixed(2)}zł
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ width: "100%" }}
          onClick={props.handleNextStep}
        >
          Przejdź do składania zamówienia
        </Button>
      </Box>
      <Box>
        <Typography variant="h5"> Obsługiwane metody płatności:</Typography>
      </Box>
    </Box>
  );
};
