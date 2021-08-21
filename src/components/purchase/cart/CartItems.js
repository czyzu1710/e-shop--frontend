import React, { useContext } from "react";
import { CartContext, TotalContext } from "../../../state/CartProvider";
import { CartItem } from "./CartItem";
import { Box, Divider } from "@material-ui/core";

export const CartItems = (props) => {
  const [cart, setCart] = useContext(CartContext);
  const [total, setTotal] = useContext(TotalContext);

  const handleIncrement = (id) => {
    let product = cart.get(id);
    product.quantity++;
    product.itemTotal = Number(product.itemTotal) + Number(product.price);
    setTotal(total + Number(product.price));
    setCart(new Map(cart));
  };

  const handleDecrement = (id) => {
    let product = cart.get(id);
    product.quantity--;
    product.itemTotal -= product.price;
    setTotal(total - product.price);
    setCart(new Map(cart));
  };

  const handleDelete = (id) => {
    let product = cart.get(id);
    cart.delete(id);
    setCart(new Map(cart));
    setTotal(total - product.itemTotal);
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
      {Array.from(cart.values()).map((item, index) => {
        return (
          <div key={index}>
            <CartItem
              {...item}
              images={item.imagesUrls}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
              handleDelete={handleDelete}
            />
            <Divider />
          </div>
        );
      })}
    </Box>
  );
};
