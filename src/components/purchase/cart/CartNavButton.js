import React, { useContext } from "react";
import { CartContext } from "../../../state/CartProvider";
import { ShoppingCart } from "@material-ui/icons";
import { Badge, IconButton } from "@material-ui/core";

export const CartNavButton = () => {
  const [cart, setCart] = useContext(CartContext); // eslint-disable-line
  return (
    <IconButton style={{ marginRight: "20px", color: "white" }}>
      <Badge
        badgeContent={Array.from(cart.values()).reduce((sum, item) => {
          return sum + item.quantity;
        }, 0)}
        color="secondary"
      >
        <ShoppingCart style={{ fontSize: "33px" }} />
      </Badge>
    </IconButton>
  );
};
