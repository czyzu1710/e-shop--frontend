import React from "react";
import { Box, IconButton, Typography } from "@material-ui/core";
import { Add, Delete, Remove } from "@material-ui/icons";
import "./CartItem.css";
import ImageService from "../../../services/images"

const IMAGE_WIDTH = 100;
const IMAGE_HEIGHT = 140;

export const CartItem = (props) => {

  return (
    <Box className="cart-item-main-container">
      <img src={ImageService.getImageWithSpecifiedSize(props.images[0],IMAGE_WIDTH, IMAGE_HEIGHT )} key={props.id} alt={ImageService.getImageAlt(props.id, props.images[0])}/>
      <Box className="cart-item-sub-container">
        <Box>
          <Typography variant="h6">{props.name}</Typography>
          <Typography variant="subtitle1">Rozmiar: {props.size}</Typography>
        </Box>
        <Box className="cart-item-button-container">
          <IconButton
            onClick={() => props.handleDecrement(`${props.id}:${props.size}`)}
            disabled={props.quantity === 1}
          >
            <Remove />
          </IconButton>
          <Typography variant="h6">{props.quantity}</Typography>
          <IconButton
            onClick={() => props.handleIncrement(`${props.id}:${props.size}`)}
          >
            <Add />
          </IconButton>
        </Box>
      </Box>
      <Box className="cart-item-sub-sub-container">
        <IconButton
          onClick={() => props.handleDelete(`${props.id}:${props.size}`)}
        >
          <Delete fontSize="large" color="secondary" />
        </IconButton>
        <Typography variant="h6">
          {Number(props.itemTotal).toFixed(2)}zł
        </Typography>
      </Box>
    </Box>
  );
};
