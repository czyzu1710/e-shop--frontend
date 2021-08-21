import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { LocalMall } from "@material-ui/icons";
import { CartContext, TotalContext } from "../../state/CartProvider";
import "./ProductInfo.css";

export const ProductInfo = ({ info, available, id}) => {

  const [size, setSize] = useState("");
  const [cart, setCart] = useContext(CartContext);
  const [total, setTotal] = useContext(TotalContext);

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleAddToCart = () => {
    if (cart.has(`${id}:${size}`)) {
      let product = cart.get(`${id}:${size}`);
      product.quantity++;
      product.itemTotal = +product.itemTotal + +info.price;
      setCart(new Map(cart.set(`${id}:${size}`, product)));
    } else {
      setCart(
        new Map(
          cart.set(`${id}:${size}`, {
            id: id,
            name: info.name,
            price: info.price,
            size: size,
            quantity: 1,
            itemTotal: info.price,
            imagesUrls: info.imagesUrls,
          })
        )
      );
    }
    setTotal(total + Number(info.price));
  };

  return (
    <Box className="product-info-main-container">
      <Typography variant={"h4"}>{info.name}</Typography>
      <Typography variant={"h4"}>{info.price}</Typography>
      <FormControl style={{ marginTop: "20px" }}>
        <InputLabel id="select-size-label">Wybierz rozmiar</InputLabel>
        <Select
          labelId="select-size-label"
          id="select-size"
          value={size}
          onChange={handleSizeChange}
        >
          <MenuItem value="">Wybierz rozmiar</MenuItem>
          {available.map((_size, index) => {
            return (
              <MenuItem value={_size} key={index}>
                {_size}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Button
        style={{ marginTop: "10vh" }}
        variant="contained"
        disabled={!size}
        onClick={handleAddToCart}
      >
        <span style={{ display: "flex" }}>
          <LocalMall />
          <Typography variant={"subtitle1"}>Dodaj do koszyka</Typography>
        </span>
      </Button>
    </Box>
  );
};
