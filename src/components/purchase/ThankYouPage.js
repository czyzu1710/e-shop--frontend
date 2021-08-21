import React, { useContext, useEffect, useState } from "react";
import { Backdrop, Box, CircularProgress, Typography } from "@material-ui/core";
import { CartContext, TotalContext } from "../../state/CartProvider";
import "./ThankYouPage.css";
import OrderService from "../../services/order";

export const ThankYouPage = (props) => {
  const [open, setOpen] = useState(true);
  const [cart, setCart] = useContext(CartContext); // eslint-disable-line
  const [total, setTotal] = useContext(TotalContext); // eslint-disable-line
  const resetContext = () => {
    setCart(new Map());
    setTotal(0.0);
  };

  useEffect(() => {
    props.setHidden();

    OrderService.order(props.dataToSend).then(
        () => {
          console.log("Generated email");
        },
        () => {
          console.log("error")
        }
    )
  }, []); // eslint-disable-line

  setTimeout(() => {
    resetContext();
    setOpen(false);
  }, 1000 * 3);

  return open ? (
    <Backdrop open={open}>
      <CircularProgress />
    </Backdrop>
  ) : (
    <Box className="thank-you-page-main-container">
      <Typography variant="h2"> Dziękujemy za dokonanie zakupu!</Typography>
    </Box>
  );
};
